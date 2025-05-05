
-- Create enum types for consistent data
CREATE TYPE user_role AS ENUM ('pharma', 'hospital', 'regulator');
CREATE TYPE side_effect_severity AS ENUM ('None', 'Mild', 'Moderate', 'Severe');
CREATE TYPE health_status AS ENUM ('Improved', 'Worsened', 'Unchanged');
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE trial_status AS ENUM ('pending', 'in_progress', 'completed', 'approved', 'rejected');

-- Create profiles table that extends auth.users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create table for drug trials
CREATE TABLE drug_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drug_name TEXT NOT NULL,
  dosage_numeric DECIMAL NOT NULL,
  side_effect_severity side_effect_severity NOT NULL,
  trial_instructions TEXT,
  created_by UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create table for trial batches assigned to hospitals
CREATE TABLE trial_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trial_id UUID REFERENCES drug_trials(id) NOT NULL,
  hospital_id UUID REFERENCES profiles(id) NOT NULL,
  sample_size INTEGER NOT NULL,
  status trial_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE (trial_id, hospital_id)
);

-- Create table for patient records
CREATE TABLE patient_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES trial_batches(id) NOT NULL,
  hospital_id UUID REFERENCES profiles(id) NOT NULL,
  patient_id TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender gender_type NOT NULL,
  trial_duration INTEGER NOT NULL,
  dosage_numeric DECIMAL NOT NULL,
  drug_name TEXT NOT NULL,
  doctor_notes TEXT,
  side_effect_severity side_effect_severity NOT NULL,
  overall_health_status health_status NOT NULL, 
  symptom_improvement_score INTEGER NOT NULL,
  known_allergies TEXT[] DEFAULT '{}',
  conditions_during_encounter TEXT[] DEFAULT '{}',
  new_conditions_after_med_start TEXT[] DEFAULT '{}',
  trial_side_effects TEXT[] DEFAULT '{}',
  has_impossible_observation BOOLEAN DEFAULT FALSE,
  proc_count INTEGER DEFAULT 0,
  claim_count INTEGER DEFAULT 0,
  avg_temp_during_trial DECIMAL,
  max_hr_during_trial INTEGER,
  min_bp_systolic_during_trial INTEGER,
  max_bp_systolic_during_trial INTEGER,
  min_bp_diastolic_during_trial INTEGER,
  max_bp_diastolic_during_trial INTEGER,
  count_side_effect_keywords_obs INTEGER DEFAULT 0,
  count_improvement_keywords_obs INTEGER DEFAULT 0,
  count_worsening_keywords_obs INTEGER DEFAULT 0,
  avg_condition_duration DECIMAL,
  std_temp_during_trial DECIMAL,
  std_hr_during_trial DECIMAL,
  std_bp_systolic_during_trial DECIMAL,
  std_bp_diastolic_during_trial DECIMAL,
  nlp_verb_count INTEGER DEFAULT 0,
  nlp_noun_count INTEGER DEFAULT 0,
  nlp_adj_count INTEGER DEFAULT 0,
  nlp_ner_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create table for trial submissions
CREATE TABLE trial_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES trial_batches(id) NOT NULL,
  hospital_id UUID REFERENCES profiles(id) NOT NULL,
  ai_anomaly_percentage DECIMAL,
  ai_anomaly_count INTEGER,
  ai_report JSONB,
  blockchain_hash TEXT,
  blockchain_tx_hash TEXT,
  status trial_status DEFAULT 'pending',
  regulator_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drug_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_submissions ENABLE ROW LEVEL SECURITY;

-- Function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- Pharma admin can create trials
CREATE POLICY "Pharma admins can create trials"
  ON drug_trials FOR INSERT
  WITH CHECK (get_user_role() = 'pharma');

-- Pharma admins can view their trials
CREATE POLICY "Pharma admins can view their trials"
  ON drug_trials FOR SELECT
  USING (created_by = auth.uid() OR get_user_role() = 'regulator');

-- Pharma admins can assign batches to hospitals
CREATE POLICY "Pharma admins can assign batches"
  ON trial_batches FOR INSERT
  WITH CHECK (
    get_user_role() = 'pharma' AND
    EXISTS (SELECT 1 FROM drug_trials WHERE id = trial_id AND created_by = auth.uid())
  );

-- All roles can view relevant batches
CREATE POLICY "Users can view relevant batches"
  ON trial_batches FOR SELECT
  USING (
    (get_user_role() = 'pharma' AND EXISTS (SELECT 1 FROM drug_trials WHERE id = trial_id AND created_by = auth.uid())) OR
    (get_user_role() = 'hospital' AND hospital_id = auth.uid()) OR
    (get_user_role() = 'regulator')
  );

-- Hospitals can update their assigned batches
CREATE POLICY "Hospitals can update their assigned batches"
  ON trial_batches FOR UPDATE
  USING (hospital_id = auth.uid() AND get_user_role() = 'hospital');

-- Hospitals can create patient records for their batches
CREATE POLICY "Hospitals can create patient records"
  ON patient_records FOR INSERT
  WITH CHECK (
    get_user_role() = 'hospital' AND
    hospital_id = auth.uid() AND
    EXISTS (SELECT 1 FROM trial_batches WHERE id = batch_id AND hospital_id = auth.uid())
  );

-- Hospitals can view their patient records
CREATE POLICY "Hospitals can view their patient records"
  ON patient_records FOR SELECT
  USING (
    (get_user_role() = 'hospital' AND hospital_id = auth.uid()) OR
    (get_user_role() = 'regulator')
  );

-- Hospitals can submit trial results
CREATE POLICY "Hospitals can submit trial results"
  ON trial_submissions FOR INSERT
  WITH CHECK (
    get_user_role() = 'hospital' AND
    hospital_id = auth.uid() AND
    EXISTS (SELECT 1 FROM trial_batches WHERE id = batch_id AND hospital_id = auth.uid())
  );

-- Allow view access to submissions based on role
CREATE POLICY "Users can view relevant submissions"
  ON trial_submissions FOR SELECT
  USING (
    (get_user_role() = 'hospital' AND hospital_id = auth.uid()) OR
    (get_user_role() = 'regulator') OR
    (get_user_role() = 'pharma' AND EXISTS (
      SELECT 1 FROM trial_batches 
      JOIN drug_trials ON trial_batches.trial_id = drug_trials.id 
      WHERE trial_batches.id = batch_id AND drug_trials.created_by = auth.uid()
    ))
  );

-- Regulators can update submission status
CREATE POLICY "Regulators can update submissions"
  ON trial_submissions FOR UPDATE
  USING (get_user_role() = 'regulator');

-- Create trigger to update trial_batches status when submission is approved/rejected
CREATE OR REPLACE FUNCTION update_trial_batch_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE trial_batches
  SET status = NEW.status
  WHERE id = NEW.batch_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trial_batch_status_trigger
AFTER UPDATE OF status ON trial_submissions
FOR EACH ROW
WHEN (NEW.status IN ('approved', 'rejected'))
EXECUTE PROCEDURE update_trial_batch_status();
