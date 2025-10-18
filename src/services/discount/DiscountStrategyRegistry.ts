import type { DiscountStrategy } from "./DiscountStrategy";

import { RaiseErrorWorkflow } from "../../workflow/workflows/RaiseErrorWorkflow";
import ClubSilverDiscountStrategy from "./strategies/ClubSilverDiscountStrategy";
import ClubGoldDiscountStrategy from "./strategies/ClubGoldDiscountStrategy";
import ClubPlatinumDiscountStrategy from "./strategies/ClubPlatinumDiscountStrategy";
import LoyaltyDiscountStrategy from "./strategies/LoyaltyDiscountStrategy";
import VIPDiscountStrategy from "./strategies/VIPDiscountStrategy";
import FriendsAndFamilyDiscountStrategy from "./strategies/FriendsAndFamilyDiscountStrategy";

//Customer Group Types:
export type CustomerGroup = string;

// Strategy Registry - maps customer Group to matching Discount strategy:
class DiscountStrategyRegistry {
  private static strategies = new Map<CustomerGroup, () => DiscountStrategy>(
    [
      ['Club Silver', () => new ClubSilverDiscountStrategy()],
      ['Club Gold', () => new ClubGoldDiscountStrategy()],
      ['Club Platinum', () => new ClubPlatinumDiscountStrategy()],
      ['VIP', () => new VIPDiscountStrategy()],
      ['Loyalty', () => new LoyaltyDiscountStrategy()],
      ['Friends and Family', () => new FriendsAndFamilyDiscountStrategy()],

    ]
  );

  // Static method to get Strategy:
  static getStrategy(customerGroup: CustomerGroup) {
    const strategyFactory = this.strategies.get(customerGroup);
    if (!strategyFactory) {
      const errorWorkflow = new RaiseErrorWorkflow(`No discount strategy found for customer group: ${customerGroup}`);
      errorWorkflow.execute();
      throw new Error(`No discount strategy found for customer group: ${customerGroup}`);
    }
    return strategyFactory();
  }

  // Method to register new strategies to the Registry:
  static registerStrategy(customerGroup: CustomerGroup, strategyFactory: () => DiscountStrategy): void {
    if (this.strategies.has(customerGroup)) {
      const errorWorkflow = new RaiseErrorWorkflow(`Strategy for group ${customerGroup} is already registered.`);
      errorWorkflow.execute();
      return;
    }
    this.strategies.set(customerGroup, strategyFactory);
  }
}

export default DiscountStrategyRegistry;

/**
 * DOCUMENTATION: Discount Strategy Registry
 * 
 * This class implements the Strategy Pattern for managing different discount strategies
 * based on customer groups. It acts as a centralized registry that maps customer 
 * group names to their corresponding discount calculation strategies.
 * 
 * PURPOSE:
 * - Decouple discount logic from customer group identification
 * - Allow dynamic strategy selection at runtime
 * - Enable easy addition of new discount strategies without modifying existing code
 * - Provide a single point of access for all discount strategies
 * 
 * ARCHITECTURE:
 * - Uses a static Map to store strategy factories (not instances)
 * - Factories return new strategy instances to avoid shared state issues
 * - Throws errors for missing or duplicate strategy registrations
 * 
 * BUILT-IN STRATEGIES:
 * - 'Wine Club' -> WineClubDiscountStrategy
 * - 'Staff' -> StaffDiscountStrategy  
 * - 'Friends of the Burches' -> FotbDiscountStrategy
 * - 'International sales' -> InternationalDiscountStrategy
 * 
 * HOW TO ADD A NEW STRATEGY:
 * 
 * 1. Create your strategy class implementing DiscountStrategy interface:
 * ```typescript
 * // src/services/discount/strategies/PremiumDiscountStrategy.ts
 * import type { DiscountStrategy } from "../DiscountStrategy";
 * 
 * class PremiumDiscountStrategy implements DiscountStrategy {
 *   calculateDiscount(basePrice: number): number {
 *     return basePrice * 0.20; // 20% discount
 *   }
 * }
 * 
 * export default PremiumDiscountStrategy;
 * ```
 * 
 * 2. Register the strategy in startup.ts (recommended) or before first use:
 * ```typescript
 * import DiscountStrategyRegistry from "./services/discount/DiscountStrategyRegistry";
 * import PremiumDiscountStrategy from "./services/discount/strategies/PremiumDiscountStrategy";
 * 
 * // In startup.ts or initialization code:
 * DiscountStrategyRegistry.registerStrategy(
 *   'Premium Members',
 *   () => new PremiumDiscountStrategy()
 * );
 * ```
 * 
 * 3. Use the strategy anywhere in your application:
 * ```typescript
 * const strategy = DiscountStrategyRegistry.getStrategy('Premium Members');
 * const discount = strategy.calculateDiscount(100); // Returns 20
 * ```
 * 
 * IMPORTANT NOTES:
 * - Register strategies during application startup to ensure availability
 * - Strategy names are case-sensitive and must match exactly
 * - Duplicate registrations will throw an error
 * - Missing strategies will throw an error when requested
 * - Use factory functions to avoid shared state between strategy instances
 */