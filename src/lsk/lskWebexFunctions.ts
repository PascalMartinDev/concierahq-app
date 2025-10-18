import type { PosCallback, Consumer } from '../lsk/lsktypes';
import type { IPosContext } from './lskPosContext';

declare global {
  // Core LSK POS Functions (use consistent declaration style)
  var pos_close: () => void;
  var pos_generateCallbackId: () => string;
  var pos_disableCloseButton: () => void;

  // POS Business Functions
  var pos_getCurrentAccount: (callback: PosCallback) => void;
  var pos_setConsumer: (consumer: Consumer) => void;
  var pos_toggleDiscount: (
    discountCode: string,
    lineId: string,
    callback: PosCallback
  ) => void;
  var pos_toggleGlobalDiscount: (
    discountCode: string,
    callback: PosCallback
  ) => void;
  var pos_addExternalReference: (reference: string, prefix: string) => void;
  var pos_addSpecialItemToCurrentAccount: (
    itemId: string,
    priceCents: number,
    name: string
  ) => void;

  // Pos Message
  var pos_postMessage: (data: { name: string; args: unknown }) => void;

  // Pos Callbacks
  var callbacks: Record<string, PosCallback>;

  // POS Context Data
  var posContext: IPosContext;
}

export {};

/**
 * DOCUMENTATION: DeclareWebExFunction - Global POS Function Type Declarations
 *
 * PURPOSE:
 * TypeScript-only global declarations for Lightspeed K-Series POS web extension
 * functions. This file provides compile-time type definitions for functions that
 * are automatically injected by the Lightspeed POS runtime environment.
 *
 * HOW IT WORKS:
 * 1. COMPILE-TIME: TypeScript uses these declarations for type checking and IntelliSense
 * 2. RUNTIME: Lightspeed POS automatically injects the actual function implementations
 * 3. NO INITIALIZATION: This file contains no executable code - purely type definitions
 * 4. AUTOMATIC AVAILABILITY: Functions are globally accessible once POS runtime loads
 *
 * DECLARATION PROCESS:
 * - Uses `declare global` to extend the global namespace
 * - TypeScript includes these automatically during compilation
 * - No imports needed in other files - functions are globally available
 * - Provides type safety and IDE support for POS function calls
 *
 * GLOBAL FUNCTION DECLARATIONS:
 *
 * Core POS Functions:
 * - pos_close(): void - Closes the web extension
 * - pos_generateCallbackId(): string - Generates unique callback identifier
 * - pos_disableCloseButton(): void - Disables the default close button
 *
 * Business POS Functions:
 * - pos_getCurrentAccount(callback): void - Retrieves current transaction account data
 * - pos_setConsumer(consumer): void - Sets customer data for current transaction
 * - pos_toggleDiscount(code, lineId, callback): void - Applies/removes discount on transaction line
 * - pos_addExternalReference(reference, prefix): void - Adds external reference to transaction
 *
 * Message System:
 * - pos_postMessage(data): void - Posts messages to POS system
 *   - data format: { name: string; args: unknown }
 *
 * Callback System:
 * - callbacks: Record<string, PosCallback> - Global callback registry
 *   - Maps callback IDs to callback functions
 *   - Used for async POS operation responses
 *
 * RUNTIME vs COMPILE-TIME:
 * Compile-time (TypeScript):
 * - Provides type checking: pos_close() is known to return void
 * - Enables IntelliSense: IDE shows available functions and parameters
 * - Validates usage: prevents calling pos_setConsumer() with wrong parameters
 *
 * Runtime (Lightspeed POS):
 * - Lightspeed injects actual function implementations into global scope
 * - Functions become available automatically when web extension loads in POS
 * - No manual registration or initialization required
 *
 * TYPE INTEGRATION:
 * - Imports PosCallback and Consumer from lsktypes for consistent typing
 * - Ensures compile-time validation across the entire application
 * - Provides IntelliSense support in all files that use POS functions
 * - No runtime overhead - types are stripped during compilation
 *
 * USAGE PATTERN:
 * Functions are used directly throughout the application:
 * - No imports needed - globally available after TypeScript compilation
 * - pos_close() to close web extension
 * - pos_setConsumer(consumerData) to set customer data
 * - pos_generateCallbackId() to generate callback IDs
 *
 * BUSINESS CONTEXT:
 * These global functions enable Howard Park Wines retail POS operations:
 * - Web extension lifecycle management (open/close)
 * - Customer data synchronization with POS system
 * - Wine club discount application and removal
 * - Transaction data retrieval and external reference linking
 *
 * LIGHTSPEED INTEGRATION:
 * - Functions are injected by Lightspeed POS runtime when web extension loads
 * - Bridge between React web extension and native POS functionality
 * - Handle bidirectional communication with core POS system
 * - No manual initialization required - automatically available in POS context
 *
 * DEVELOPMENT CONSIDERATIONS:
 * - This file must be included in TypeScript compilation
 * - Functions may not be available in development/standalone environments
 * - Use typeof checks for safety: typeof pos_close !== 'undefined'
 * - Consider mocking these functions for unit testing
 *
 * The declarations in this file enable type-safe POS integration without
 * requiring any runtime initialization or manual function registration.
 */
