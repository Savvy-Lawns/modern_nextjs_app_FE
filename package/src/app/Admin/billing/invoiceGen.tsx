import React from 'react'

export default function Invoice() {

    const EmailTemplate = ({  }) => {
        return `
          <div>
            <h1>Hello ${},</h1>
            <p>${}</p>
            <footer>Best regards, <br/>Your Company</footer>
          </div>
        `;
      };

      const createMailtoLink = () => {
        const emailTemplate = EmailTemplate({  });
      
        // Strip HTML tags and encode the body
        const plainTextBody = emailTemplate
          .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
          .replace(/\n/g, "%0A"); // Convert new lines to URL-encoded line breaks
      
        return `mailto:recipient@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainTextBody)}`;
      };
      
      const handleEmailClick = () => {
        const mailtoLink = createMailtoLink();
        window.location.href = mailtoLink;
      };

  return (
    <button onClick={handleEmailClick}>
      Send Email
    </button>
  )
}
