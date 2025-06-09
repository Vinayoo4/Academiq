import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter,
  Button, 
  Progress, 
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface QuizParams {
  quizId: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const QuizView: React.FC = () => {
  const { quizId } = useParams<QuizParams>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Mock quiz data
  const quiz = {
    id: quizId,
    title: "JavaScript Fundamentals Quiz",
    description: "Test your knowledge of JavaScript fundamentals with this quiz.",
    courseId: "javascript-essentials",
    courseName: "JavaScript Essentials",
    moduleId: "module-1",
    moduleName: "JavaScript Basics",
    timeLimit: 15, // in minutes
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Object"],
        correctAnswer: 2, // Float
        explanation: "JavaScript has six primitive data types: String, Number, Boolean, Undefined, Null, and Symbol. Float is not a separate data type in JavaScript; it falls under the Number type."
      },
      {
        id: "q2",
        question: "What will the following code output? console.log(typeof null)",
        options: ["null", "object", "undefined", "NaN"],
        correctAnswer: 1, // object
        explanation: "In JavaScript, typeof null returns 'object', which is considered a historical bug in the language."
      },
      {
        id: "q3",
        question: "Which method is used to add elements to the end of an array?",
        options: ["push()", "append()", "add()", "insert()"],
        correctAnswer: 0, // push()
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
      },
      {
        id: "q4",
        question: "What does the '===' operator do in JavaScript?",
        options: [
          "Checks for equality of value only", 
          "Checks for equality of value and type", 
          "Assigns a value to a variable", 
          "Checks if a variable exists"
        ],
        correctAnswer: 1, // Checks for equality of value and type
        explanation: "The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result. Unlike the equality operator (==), it doesn't perform type conversion."
      },
      {
        id: "q5",
        question: "Which of the following is a correct way to declare a variable in JavaScript?",
        options: [
          "variable x = 5;", 
          "var x = 5;", 
          "int x = 5;", 
          "x := 5;"
        ],
        correctAnswer: 1, // var x = 5;
        explanation: "In JavaScript, variables can be declared using var, let, or const keywords. 'var x = 5;' is a valid variable declaration."
      }
    ]
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: parseInt(value)
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question, show confirmation modal
      onOpen();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);
    
    // Calculate score
    setTimeout(() => {
      setIsSubmitting(false);
      setQuizCompleted(true);
      setShowResults(true);
    }, 1500);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const score = calculateScore();
  const isPassing = score >= quiz.passingScore;

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              as={RouterLink}
              to={`/courses/${quiz.courseId}`}
              variant="light"
              size="sm"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
            >
              Back to Course
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <p className="text-default-500">
            {quiz.courseName} &gt; {quiz.moduleId}
          </p>
        </div>
      </div>

      {/* Quiz Progress */}
      <Card>
        <CardBody className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress 
            value={progress} 
            color="primary"
            aria-label="Quiz progress"
          />
        </CardBody>
      </Card>

      {/* Quiz Content */}
      {showResults ? (
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Quiz Results</h2>
            <p className="text-default-500">
              You've completed the {quiz.title}
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${
                isPassing ? "bg-success-100" : "bg-danger-100"
              }`}>
                <span className={`text-4xl font-bold ${
                  isPassing ? "text-success" : "text-danger"
                }`}>
                  {score}%
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1">
                {isPassing ? "Congratulations!" : "Almost there!"}
              </h3>
              <p className="text-default-500">
                {isPassing 
                  ? `You've passed the quiz with a score of ${score}%.` 
                  : `You've scored ${score}%. You need ${quiz.passingScore}% to pass.`}
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Question Review</h3>
              
              {quiz.questions.map((question, index) => {
                const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                
                return (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? "bg-success-100 text-success" : "bg-danger-100 text-danger"
                      }`}>
                        <Icon icon={isCorrect ? "lucide:check" : "lucide:x"} width={16} />
                      </div>
                      <div>
                        <p className="font-medium">
                          {index + 1}. {question.question}
                        </p>
                        <div className="mt-2 space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex} 
                              className={`p-2 rounded-md text-sm ${
                                selectedAnswers[question.id] === optionIndex && !isCorrect
                                  ? "bg-danger-50 border border-danger-200"
                                  : question.correctAnswer === optionIndex
                                    ? "bg-success-50 border border-success-200"
                                    : "bg-default-50 border border-default-200"
                              }`}
                            >
                              {option}
                              {selectedAnswers[question.id] === optionIndex && !isCorrect && (
                                <span className="ml-2 text-danger">Your answer</span>
                              )}
                              {question.correctAnswer === optionIndex && (
                                <span className="ml-2 text-success">Correct answer</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 p-3 bg-default-50 rounded-md text-sm">
                          <span className="font-medium">Explanation: </span>
                          {question.explanation}
                        </div>
                      </div>
                    </div>
                    
                    {index < quiz.questions.length - 1 && <Divider className="my-4" />}
                  </div>
                );
              })}
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between">
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:refresh-ccw" width={16} />}
              onPress={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
                setQuizCompleted(false);
                setShowResults(false);
              }}
            >
              Retake Quiz
            </Button>
            <Button
              color="primary"
              as={RouterLink}
              to={`/courses/${quiz.courseId}`}
              endContent={<Icon icon="lucide:chevron-right" width={16} />}
            >
              Continue Course
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1}</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-6">
            <div className="space-y-6">
              <p className="text-lg font-medium">{currentQuestion.question}</p>
              
              <RadioGroup
                value={selectedAnswers[currentQuestion.id]?.toString() || ""}
                onValueChange={handleAnswerSelect}
              >
                {currentQuestion.options.map((option, index) => (
                  <Radio key={index} value={index.toString()}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between">
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
              onPress={handlePrevQuestion}
              isDisabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              color="primary"
              endContent={
                currentQuestionIndex < totalQuestions - 1 
                  ? <Icon icon="lucide:arrow-right" width={16} />
                  : <Icon icon="lucide:check" width={16} />
              }
              onPress={handleNextQuestion}
              isDisabled={selectedAnswers[currentQuestion.id] === undefined}
            >
              {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Finish"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Submit Quiz</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to submit your quiz? You've answered {Object.keys(selectedAnswers).length} out of {totalQuestions} questions.
                </p>
                <p className="text-default-500 text-sm mt-2">
                  You won't be able to change your answers after submission.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Review Answers
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    onClose();
                    handleSubmitQuiz();
                  }}
                  isLoading={isSubmitting}
                >
                  Submit Quiz
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};