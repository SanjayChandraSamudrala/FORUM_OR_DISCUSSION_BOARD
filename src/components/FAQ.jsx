import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner. Fill in your details including username, email, and password. Verify your email address through the link we\'ll send you, and you\'re ready to go!'
    },
    {
      id: 2,
      question: 'How do I create a thread?',
      answer: 'To create a new thread, navigate to any category or community page and click the "New Thread" button. Enter your title and content, add any relevant tags, and click "Post" to publish your thread.'
    },
    {
      id: 3,
      question: 'How do I save a thread?',
      answer: 'To save a thread, click the bookmark icon on any thread you want to save. You can find all your saved threads in your profile under the "Saved" tab.'
    },
    {
      id: 4,
      question: 'How do I create a community?',
      answer: 'To create a community, go to the Communities page and click "Create Community". Fill in the community details including name, description, and rules. You\'ll automatically become the community moderator.'
    },
    {
      id: 5,
      question: 'How do I use emojis in my posts?',
      answer: 'When writing a post or reply, click the emoji icon in the text editor to open the emoji picker. Select any emoji to add it to your text. You can also type ":" followed by the emoji name.'
    },
    {
      id: 6,
      question: 'How do I format my posts?',
      answer: 'Use the formatting toolbar above the text editor to format your text. You can make text bold, italic, add links, and create lists. You can also use markdown syntax for advanced formatting.'
    },
    {
      id: 7,
      question: 'How do likes and dislikes work?',
      answer: 'Click the thumbs up icon to like a post or reply, or the thumbs down icon to dislike. You can only have one active reaction per post. Your reaction affects the content\'s visibility and ranking.'
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="faq">
      <h1 className="faq__title">Frequently Asked Questions</h1>
      <div className="faq__list">
        {faqItems.map((item) => (
          <div key={item.id} className="faq__item">
            <button
              className={`faq__question ${openItem === item.id ? 'faq__question--open' : ''}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={openItem === item.id}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="faq__question-text">{item.question}</span>
              <ChevronDown className="faq__icon" />
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className={`faq__answer ${openItem === item.id ? 'faq__answer--open' : ''}`}
              aria-hidden={openItem !== item.id}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 