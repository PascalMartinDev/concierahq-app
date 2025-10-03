type SearchCardProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onClick: () => void;
};

const SearchCard = ({ firstName, lastName, email, phone, onClick }: SearchCardProps) => {
  
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-200 p-6 mb-4 cursor-pointer active:scale-95"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {/* Avatar and Name */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
            {firstName.charAt(0)}{lastName.charAt(0)}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {firstName} {lastName}
          </h3>
        </div>
        
        {/* Email */}
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{email}</span>
        </div>
        
        {/* Phone */}
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm">{phone}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

/**
 * DOCUMENTATION: SearchCard Component
 * 
 * PURPOSE:
 * A React display component that renders individual customer search results
 * in an interactive card format for wine retail POS integration. Provides
 * comprehensive customer information with click-to-select functionality.
 * 
 * FUNCTIONALITY:
 * - Displays customer contact information in visually appealing card format
 * - Provides click interaction for customer selection
 * - Shows customer initials in avatar-style display
 * - Implements professional styling with hover effects
 * 
 * PROPS INTERFACE:
 * - firstName: Customer's first name for display and avatar
 * - lastName: Customer's last name for display and avatar
 * - email: Customer's email address with icon
 * - phone: Customer's phone number with icon
 * - onClick: Callback function for customer selection
 * 
 * VISUAL DESIGN:
 * - Avatar circle with customer initials
 * - Customer name prominently displayed
 * - Email and phone with SVG icons
 * - Card-based layout with shadows and hover effects
 * 
 * BUSINESS CONTEXT:
 * Essential for wine retail customer lookup:
 * - Quick customer identification during POS transactions
 * - Visual scanning of search results
 * - Member verification for discount application
 * - Contact information at-a-glance access
 * 
 * INTERACTION DESIGN:
 * - Hover effects for better user experience
 * - Active scale animation on click
 * - Cursor pointer indicating clickable nature
 * - Smooth transitions for professional feel
 * 
 * USAGE PATTERN:
 * Rendered within SearchResultsList for each search result
 */