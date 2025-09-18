import { useState, useRef, useEffect } from 'react';

const SidebarChat = ({ isOpen, toggleSidebar }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! How can I help you with CreateAI Builder today?' },
    { sender: 'user', text: 'I need help with templates' },
    { sender: 'bot', text: 'Of course! We have many templates available. You can browse them in the Templates section. Is there a specific type of template you\'re looking for?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Show tooltip after a delay
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    // Clear input
    setMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Mock bot response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [
        ...prev,
        { sender: 'bot', text: 'Thanks for your message! This is a prototype chat interface. In the full version, this would connect to a real API.' }
      ]);
    }, 1500);
  };

  // Button that shows even when sidebar is collapsed
  const toggleButton = (
    <div className={`fixed ${isOpen ? 'bottom-[36px] right-[335px]' : 'bottom-[36px] right-[36px]'} transition-all duration-300 z-20`}>
      {/* "Ask me!" label that appears above button when chat is closed */}
      {!isOpen && showTooltip && (
        <div className="absolute bottom-16 right-[-6px] flex flex-col items-end animate-fadeIn">
          <div className="w-[94px] bg-gray-100 text-gray-500 px-4 py-2 rounded-full font-medium shadow-md flex items-center justify-center">
            Ask me!
          </div>
          <div className="w-4 h-4 bg-gray-100 transform rotate-45 mt-[-8px] mr-[28px]"></div>
        </div>
      )}
      
      <button
        onClick={toggleSidebar}
        className={`bg-brand-1 text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 hover:shadow-xl 
                  transition-all flex items-center justify-center w-14 h-14 
                  ${!isOpen && 'animate-pulse hover:animate-none'}`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <span className="material-icons text-2xl">
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>
    </div>
  );

  return (
    <>
      {toggleButton}
      
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-200 
                    transition-all duration-300 ease-in-out z-10 flex flex-col
                    ${isOpen ? 'w-[320px]' : 'w-0'}`}
      >
        {isOpen && (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                
                <h2 className="font-semibold text-gray-800">Ask me!</h2>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setChatHistory([])}
                title="Clear chat"
              >
                <span className="material-icons">delete_outline</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block p-3 rounded-lg max-w-[85%] ${
                      msg.sender === 'user'
                        ? 'bg-brand-1 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-xs mt-1 text-gray-500 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="mb-4">
                  <div className="inline-block p-3 rounded-lg bg-white text-gray-800 rounded-bl-none border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                  <div className="text-xs mt-1 text-gray-500">AI Assistant</div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-1"
                />
                <button 
                  type="submit" 
                  className="bg-brand-1 text-white p-2 rounded-r-md hover:bg-opacity-90 disabled:opacity-50"
                  disabled={isTyping || !message.trim()}
                >
                  <span className="material-icons">send</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SidebarChat;
