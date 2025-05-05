
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock AI model for anomaly detection
function detectAnomalies(hospitalId: string, patientData: any[]) {
  const totalPatients = patientData.length;
  const anomalyCount = Math.floor(Math.random() * (totalPatients / 3)); // Random number of anomalies, up to 1/3 of patients
  
  const individualPatientResults = patientData.map((patient, index) => {
    // Create some deterministic "anomalies" based on the data
    // For example, if the side effect severity is high but the health status is "Improved"
    const isAnomalous = 
      (patient.side_effect_severity === "Severe" && patient.overall_health_status === "Improved") ||
      (patient.has_impossible_observation === true) ||
      (patient.count_side_effect_keywords_obs > 5 && patient.symptom_improvement_score > 7) ||
      (index < anomalyCount); // Force some patients to be anomalous for demo purposes
    
    // Create some "rules" that might have been triggered
    const possibleRules = [
      "inconsistent_vitals",
      "symptom_outcome_mismatch",
      "improbable_side_effects",
      "outlier_values",
      "missing_critical_data",
      "treatment_protocol_violation"
    ];
    
    // Select random rules that were triggered for this patient
    const triggeredRules = isAnomalous 
      ? possibleRules
          .filter(() => Math.random() > 0.5)
          .slice(0, Math.floor(Math.random() * 3) + 1) 
      : [];
    
    return {
      patient_id: patient.patient_id,
      rule_score: isAnomalous ? (Math.random() * 0.6) + 0.4 : Math.random() * 0.3, // Higher score = more likely anomaly
      triggered_rules: triggeredRules,
      model_predictions: {
        anomaly_probability: isAnomalous ? (Math.random() * 0.6) + 0.4 : Math.random() * 0.3,
        confidence: (Math.random() * 0.3) + 0.7,
      },
      final_combined_prediction: {
        is_anomaly: isAnomalous,
        score: isAnomalous ? (Math.random() * 0.6) + 0.4 : Math.random() * 0.3,
      },
      error: null
    };
  });
  
  // Calculate anomaly percentage
  const anomalyPercentage = (anomalyCount / totalPatients) * 100;
  
  return {
    hospital_id: hospitalId,
    individual_patient_results: individualPatientResults,
    overall_hospital_prediction: {
      label: anomalyPercentage > 20 ? "High Anomaly Rate" : 
             anomalyPercentage > 10 ? "Moderate Anomaly Rate" : 
             "Low Anomaly Rate",
      anomaly_percentage: anomalyPercentage,
      anomaly_count: anomalyCount,
      total_patients: totalPatients,
      severity_distribution: {
        low: Math.floor(anomalyCount * 0.5),
        medium: Math.floor(anomalyCount * 0.3),
        high: Math.floor(anomalyCount * 0.2)
      },
      most_common_rules: ["symptom_outcome_mismatch", "outlier_values"]
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  if (req.method === 'POST') {
    try {
      const { hospital_id, patient_data } = await req.json();
      
      if (!hospital_id || !patient_data || !Array.isArray(patient_data)) {
        return new Response(
          JSON.stringify({ error: "Invalid request format. Please provide hospital_id and patient_data array." }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
            status: 400 
          }
        );
      }
      
      // Detect anomalies in the patient data
      const result = detectAnomalies(hospital_id, patient_data);
      
      return new Response(
        JSON.stringify(result),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 200 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message || "Internal server error" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      );
    }
  }
  
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
      status: 405 
    }
  );
});
