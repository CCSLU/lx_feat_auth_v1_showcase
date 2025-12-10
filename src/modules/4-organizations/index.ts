/**
 * Organizations Module
 *
 * This module handles all functionality related to organizations in the application:
 * - Organization creation and management
 * - Organization types (company or personal)
 * - User-organization relationships
 *
 * @module organizations
 */

// Re-export components
export { default as CreateOrgForm } from "./components/create-org-form";

// Re-export schemas
export {
  basicOrgSchema,
  completeOrgSchema,
  billingOrgSchema,
} from "../../entities/2-orgs/schemas/org-zod-schemas";

// Re-export actions
export { createOrgAction } from "./actions/create/create-org-action";
