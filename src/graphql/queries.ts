// src/graphql/queries.ts
export const listFollowUps = /* GraphQL */ `
  query ListFollowUps(
    $filter: ModelFollowUpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowUps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        dueDate
        priority
        status
        completed
        case {
          id
          caseNumber
          client {
            id
            name
          }
        }
        assignedTo {
          id
          firstName
          lastName
          email
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        role
        client {
          id
          name
        }
      }
      nextToken
    }
  }
`;
// Keep all existing queries above, then add these new ones:

export const listCases = /* GraphQL */ `
  query ListCases(
    $filter: ModelCaseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        caseNumber
        caseType
        status
        employee {
          firstName
          lastName
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getDashboardStats = /* GraphQL */ `
  query GetDashboardStats {
    getDashboardStats {
      totalCases
      openCases
      overdueFollowUps
      completedToday
    }
  }
`;