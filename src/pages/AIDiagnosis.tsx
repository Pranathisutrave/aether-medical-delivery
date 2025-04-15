
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  FileText,
  Loader2,
  ListChecks,
  HeartPulse
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface Symptom {
  id: number;
  name: string;
}

interface DiagnosisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
  urgency: "low" | "medium" | "high";
}

const AIDiagnosis = () => {
  const { isAuthenticated } = useAuth();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mainSymptom, setMainSymptom] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // Mock symptoms for demo purposes
  const commonSymptoms: Symptom[] = [
    { id: 1, name: "Fever" },
    { id: 2, name: "Headache" },
    { id: 3, name: "Cough" },
    { id: 4, name: "Fatigue" },
    { id: 5, name: "Nausea" },
    { id: 6, name: "Dizziness" },
    { id: 7, name: "Shortness of breath" },
    { id: 8, name: "Chest pain" },
    { id: 9, name: "Joint pain" },
    { id: 10, name: "Rash" },
    { id: 11, name: "Sore throat" },
    { id: 12, name: "Diarrhea" }
  ];

  const toggleSymptom = (symptom: Symptom) => {
    if (selectedSymptoms.some(s => s.id === symptom.id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptom.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to use the AI Diagnosis tool");
      return;
    }

    if (!age || !gender || !mainSymptom || selectedSymptoms.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Simulate API call for diagnosis
    setLoading(true);
    setTimeout(() => {
      // Mock diagnosis result based on selected symptoms
      const mockDiagnosis = getMockDiagnosis(selectedSymptoms);
      setResult(mockDiagnosis);
      setLoading(false);
    }, 2000);
  };

  const getMockDiagnosis = (symptoms: Symptom[]): DiagnosisResult => {
    const hasFever = symptoms.some(s => s.name === "Fever");
    const hasCough = symptoms.some(s => s.name === "Cough");
    const hasHeadache = symptoms.some(s => s.name === "Headache");
    const hasSoreThroat = symptoms.some(s => s.name === "Sore throat");
    const hasBreathingIssue = symptoms.some(s => s.name === "Shortness of breath");
    const hasChestPain = symptoms.some(s => s.name === "Chest pain");
    
    // Simple logic for mock diagnosis
    if (hasFever && hasCough && hasSoreThroat) {
      return {
        condition: "Potential Upper Respiratory Infection",
        confidence: 85,
        description: "Your symptoms suggest an upper respiratory tract infection, possibly viral in nature. This is usually not serious but requires rest and proper hydration.",
        recommendations: [
          "Get plenty of rest and stay hydrated",
          "Take over-the-counter medications for symptom relief",
          "Monitor your temperature"
        ],
        urgency: "low"
      };
    } else if (hasFever && hasHeadache && hasBreathingIssue) {
      return {
        condition: "Potential Influenza",
        confidence: 78,
        description: "Your symptoms are consistent with influenza (flu). While usually not severe, it can lead to complications in some cases.",
        recommendations: [
          "Rest at home and avoid contact with others",
          "Take antipyretics for fever if needed",
          "Consider antiviral medications if diagnosed within 48 hours"
        ],
        urgency: "medium"
      };
    } else if (hasChestPain && hasBreathingIssue) {
      return {
        condition: "Potential Respiratory Distress",
        confidence: 72,
        description: "Chest pain with difficulty breathing may indicate a more serious condition that requires medical attention.",
        recommendations: [
          "Seek immediate medical attention",
          "Do not drive yourself to the hospital",
          "Take note of when symptoms started and their severity"
        ],
        urgency: "high"
      };
    } else {
      return {
        condition: "Mild Viral Syndrome",
        confidence: 65,
        description: "Your symptoms suggest a mild viral condition that should resolve with rest and proper self-care.",
        recommendations: [
          "Rest and hydration",
          "Over-the-counter symptom relief as needed",
          "Monitor for worsening symptoms"
        ],
        urgency: "low"
      };
    }
  };

  const resetForm = () => {
    setAge("");
    setGender("");
    setMainSymptom("");
    setAdditionalInfo("");
    setSelectedSymptoms([]);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Medical Diagnosis</h1>
          <p className="mt-3 text-xl text-gray-600">
            Our advanced AI system analyzes your symptoms to provide preliminary health insights
          </p>
        </div>

        {!isAuthenticated && (
          <Card className="mb-8 border-orange-300 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Authentication Required</h3>
                  <p className="text-gray-700 mt-1">
                    Please login or create an account to use our AI diagnosis tool.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <Link to="/login">
                      <Button variant="outline" className="border-medify-blue text-medify-blue hover:bg-medify-blue hover:text-white">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-medify-blue text-white hover:bg-medify-blue-dark">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Diagnosis form */}
        <form onSubmit={handleSubmit} className={isAuthenticated ? "" : "opacity-75 pointer-events-none"}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 text-medify-blue" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age*
                  </label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="health-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender*
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="health-input bg-white"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 text-medify-blue" />
                Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="mainSymptom" className="block text-sm font-medium text-gray-700 mb-1">
                  Main Symptom*
                </label>
                <Input
                  id="mainSymptom"
                  placeholder="What's your primary concern?"
                  value={mainSymptom}
                  onChange={(e) => setMainSymptom(e.target.value)}
                  className="health-input"
                  required
                />
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-3">
                  Select All Applicable Symptoms*
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedSymptoms.some(s => s.id === symptom.id)
                          ? "bg-medify-blue text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {symptom.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Provide any other details about your condition (optional)"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="health-input min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="btn-primary w-full" 
                disabled={loading || !isAuthenticated}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  "Get AI Diagnosis"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Diagnosis Result */}
        {result && (
          <Card className={`mb-8 border-l-4 ${
            result.urgency === "high" 
              ? "border-l-medify-red" 
              : result.urgency === "medium" 
              ? "border-l-orange-400" 
              : "border-l-green-500"
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HeartPulse className="mr-2 text-medify-blue" />
                AI Diagnosis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-bold text-lg">{result.condition}</h3>
                  <p className="text-sm text-gray-600">
                    Confidence Level: {result.confidence}%
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  result.urgency === "high" 
                    ? "bg-red-100 text-red-800" 
                    : result.urgency === "medium" 
                    ? "bg-orange-100 text-orange-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {result.urgency === "high" 
                    ? "Urgent Attention Needed" 
                    : result.urgency === "medium" 
                    ? "Medical Attention Recommended" 
                    : "Routine Care"
                  }
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{result.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <ListChecks size={18} className="mr-2" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 size={18} className="mr-2 text-green-500 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                <p><strong>Important:</strong> This is an AI-generated preliminary assessment and not a professional medical diagnosis. Please consult with a healthcare professional.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                onClick={resetForm}
                variant="outline"
                className="w-full sm:w-auto"
              >
                New Diagnosis
              </Button>
              <Link to="/drone-delivery" className="w-full sm:w-auto">
                <Button className="btn-primary w-full">
                  Request Medicine Delivery
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIDiagnosis;
