// src/graphql/mutations.ts
export const updateFollowUp = /* GraphQL */ `
  mutation UpdateFollowUp(
    $input: UpdateFollowUpInput!
    $condition: ModelFollowUpConditionInput
  ) {
    updateFollowUp(input: $input, condition: $condition) {
      id
      description
      dueDate
      priority
      status
      completed
      assignedTo {
        id
        firstName
        lastName
      }
      case {
        id
        caseNumber
      }
      updatedAt
    }
  }
`;