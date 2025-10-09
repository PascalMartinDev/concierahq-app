const AppFooter = () => {
  return (
    <footer className="bg-gray-600">
      <div className="container mx-auto text-left">
        <div className="text-center">
          <p className="text-center py-2 text-white">
            ConcieraHQ developed by Konnectit.io<span className="mx-3">|</span>
            For support email: dev@konnectit.io
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

/*
=============================================================================
DEVELOPER DOCUMENTATION - Footer Component
=============================================================================

OVERVIEW:
The Footer component provides a simple, branded footer for the LSK Web Extension
application. It serves as the bottom section of the main layout, containing
developer attribution and support contact information.

KEY FEATURES:
1. Static branding information display
2. Support contact details
3. Consistent styling with gray theme
4. Responsive container layout

PROPS:
None - This is a stateless component with no configurable properties.

STYLING APPROACH:
- Uses TailwindCSS classes for consistent theming
- Gray color scheme (bg-gray-600) to complement the application header
- Centered text layout with proper spacing (py-4)
- White text for contrast against gray background
- Responsive container with mx-auto centering

LAYOUT STRUCTURE:
- <footer> with gray background
- Container div for responsive width management  
- Inner div for text centering
- Paragraph with developer attribution and support email

ARCHITECTURAL NOTES:
- Purely presentational component with no state or logic
- No props or configuration options (static content)
- Follows React functional component pattern
- Part of the core layout system alongside HeaderSection and MainSection
- Minimal footprint - focuses solely on branding and support information

USAGE:
This component is typically used as part of the main application layout:

```tsx
<div className="app-layout">
  <HeaderSection />
  <MainSection />
  <Footer />
</div>
```

MAINTENANCE CONSIDERATIONS:
- Update contact information in the component when support channels change
- Styling changes should maintain consistency with overall application theme
- Component is intentionally simple - avoid adding complexity without clear need
- Consider extracting contact information to configuration if it needs frequent updates

DESIGN DECISIONS:
1. No props: Keeps the footer simple and consistent across the application
2. Static content: Support information rarely changes, so hardcoding is acceptable
3. Minimal styling: Uses only necessary classes to maintain clean appearance
4. Single responsibility: Only handles footer display, no additional functionality
=============================================================================
*/
