import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('process');
  const [formData, setFormData] = useState({
    applicationUrl: '',
    instructions: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmissionsData() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('admissions_settings')
          .select('application_form_url, application_instructions')
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            applicationUrl: data.application_form_url || 'https://docs.google.com/forms/d/e/your-form-id/viewform',
            instructions: data.application_instructions || 'Please fill out our online application form to begin the admission process.'
          });
        }
      } catch (error) {
        console.error("Error fetching admissions data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdmissionsData();
  }, []);

  const admissionSteps = [
    {
      title: 'Submit Application',
      description: 'Fill out the online application form with your child\'s details and submit all required documents.',
    },
    {
      title: 'Application Review',
      description: 'Our admissions team will review your application and verify the submitted documents.',
    },
    {
      title: 'Entrance Assessment',
      description: 'Depending on the grade level, your child may be required to take an entrance assessment or interview.',
    },
    {
      title: 'Admission Decision',
      description: 'You will be notified of the admission decision within two weeks of completing all requirements.',
    },
    {
      title: 'Fee Payment',
      description: 'Upon acceptance, secure your child\'s place by paying the required registration and tuition fees.',
    },
    {
      title: 'Orientation',
      description: 'Attend the new student and parent orientation session before the start of the academic year.',
    },
  ];

  const requiredDocuments = [
    'Completed application form',
    'Birth certificate (original and photocopy)',
    'Previous school records/transfer certificate',
    '4 recent passport-size photographs',
    'Proof of residence',
    'Immunization records',
    'Parent/guardian ID proof',
  ];

  const faqs = [
    {
      question: 'When does the admission process begin for the new academic year?',
      answer: 'Admissions for the new academic year typically open in January. Early applications are encouraged as seats are limited.',
    },
    {
      question: 'Are there any entrance exams for admission?',
      answer: 'Yes, students applying for grades VI and above are required to take an entrance assessment in English, Mathematics, and Science.',
    },
    {
      question: 'What is the student-teacher ratio?',
      answer: 'We maintain a student-teacher ratio of 20:1 to ensure personalized attention for each student.',
    },
    {
      question: 'Do you offer scholarships?',
      answer: 'Yes, we offer merit-based scholarships for academically gifted students and need-based financial aid for deserving candidates.',
    },
    {
      question: 'Is there a waiting list for admissions?',
      answer: 'Yes, when all seats are filled, eligible candidates are placed on a waiting list and are offered admission as vacancies arise.',
    },
    {
      question: 'Can I transfer my child mid-year?',
      answer: 'Mid-year transfers are accepted subject to seat availability and the student meeting our academic requirements.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-80 bg-school-primary">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative container-custom h-full flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
            <p className="text-xl max-w-3xl">Join our community of learners and begin your educational journey with us</p>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center">
              <button
                className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                  activeTab === 'process'
                    ? 'bg-school-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('process')}
              >
                Admission Process
              </button>
              <button
                className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                  activeTab === 'documents'
                    ? 'bg-school-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('documents')}
              >
                Required Documents
              </button>
              <button
                className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                  activeTab === 'faq'
                    ? 'bg-school-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('faq')}
              >
                FAQs
              </button>
              <button
                className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                  activeTab === 'apply'
                    ? 'bg-school-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('apply')}
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            {/* Admission Process Tab */}
            {activeTab === 'process' && (
              <div>
                <h2 className="section-heading text-center mb-12">Admission Process</h2>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-8">
                    {admissionSteps.map((step, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-school-primary text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-school-primary mb-2">{step.title}</h3>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="btn-primary inline-flex items-center"
                    >
                      Begin Application <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Required Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <h2 className="section-heading text-center mb-12">Required Documents</h2>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                  <p className="text-gray-700 mb-6">
                    Please prepare the following documents for submission with your application:
                  </p>
                  
                  <ul className="space-y-4">
                    {requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="h-5 w-5 text-school-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 p-4 bg-school-accent rounded-md">
                    <p className="text-gray-700">
                      <strong>Note:</strong> All documents must be submitted in the original with one photocopy. Original documents will be returned after verification.
                    </p>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="btn-primary inline-flex items-center"
                    >
                      Begin Application <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === 'faq' && (
              <div>
                <h2 className="section-heading text-center mb-12">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-school-primary mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <p className="text-gray-700 mb-4">
                      Still have questions? Feel free to contact our admissions office.
                    </p>
                    <a href="/contact" className="btn-secondary mr-4">
                      Contact Us
                    </a>
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="btn-primary inline-flex items-center"
                    >
                      Begin Application <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Apply Now Tab */}
            {activeTab === 'apply' && (
              <div>
                <h2 className="section-heading text-center mb-12">Online Application Form</h2>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <p className="text-center text-gray-700 mb-6">
                        {formData.instructions}
                      </p>
                      
                      <div className="text-center mb-8">
                        <a
                          href={formData.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center"
                        >
                          Open Application Form <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                      
                      <div className="p-4 bg-school-accent rounded-md mb-6">
                        <p className="text-gray-700">
                          <strong>Note:</strong> After submitting the online form, you will receive an email with further instructions and a reference number. Please keep this reference number for all future correspondence regarding your application.
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-school-primary mb-4">Alternative Application Methods</h3>
                      <p className="text-gray-700 mb-4">
                        If you prefer to apply in person or face any issues with the online form, you can:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                        <li>Visit our campus during office hours (Monday to Friday, 9 AM to 3 PM)</li>
                        <li>Request an application form via email at admissions@campusgateway.edu</li>
                        <li>Call our admissions office at +1 (555) 123-4567</li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="section-heading text-center mb-12">What Parents Say</h2>
            
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8">
              <div className="text-center">
                <svg className="h-12 w-12 text-school-primary mx-auto mb-4 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104-6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.855-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl text-gray-700 italic mb-6">
                  The admission process was smooth and transparent. The staff was helpful and guided us through every step. Our child has been thriving since joining the school.
                </p>
                <div className="font-semibold text-school-primary">
                  - Mrs. Jennifer Davis, Parent of a Grade 6 student
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admissions;
