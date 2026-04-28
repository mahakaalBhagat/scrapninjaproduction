# Contributing to ScrapNinja

Thank you for your interest in contributing to ScrapNinja! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming community
- Report issues to: conduct@scrapninja.ae

## Getting Started

### 1. Fork the Repository
```bash
git clone https://github.com/yourusername/scrapninja.git
cd scrapninja
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
git checkout -b fix/your-bug-fix
```

### 3. Follow Coding Standards

#### Frontend (TypeScript/React)
- Use TypeScript strictly
- Follow React hooks best practices
- Use functional components
- Name components in PascalCase
- Use camelCase for functions/variables
- Follow ESLint rules
- Format with Prettier

**Example:**
```typescript
interface ButtonProps {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

#### Backend (Java/Spring)
- Follow Java naming conventions
- Use meaningful class/method names
- Add Javadoc to public methods
- Use proper exception handling
- Follow Spring project conventions

**Example:**
```java
@RestController
@RequestMapping("/api/pickups")
public class PickupController {
    
    /**
     * Create a new pickup request
     * @param request The pickup request data
     * @return Created pickup response
     */
    @PostMapping
    public ResponseEntity<PickupDTO> createPickup(
        @Valid @RequestBody PickupRequest request) {
        // Implementation
    }
}
```

### 4. Commit Messages

Follow conventional commits:
```
feat: add new feature description
fix: fix bug description
docs: update documentation
style: code style changes
refactor: refactor code
test: add/update tests
chore: update dependencies
```

**Example:**
```
feat: add price estimation API endpoint

- Implement pricing calculation algorithm
- Add caching for pricing rules
- Add unit tests for price calculation

Fixes #123
```

### 5. Push Changes
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests passed
- [ ] Integration tests passed
- [ ] Manual testing done

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated

## Related Issues
Fixes #(issue number)
```

## Testing Requirements

### Frontend
```bash
npm run type-check    # Type checking
npm run lint          # Linting
npm run test          # Unit tests
```

### Backend
```bash
mvn test              # Unit tests
mvn verify            # Integration tests
mvn jacoco:report     # Coverage report
```

### Before Submitting PR
- [ ] All tests pass
- [ ] Code is formatted
- [ ] No console errors/warnings
- [ ] Documentation updated

## Documentation

### Update These Files
- `README.md` - For major changes
- `SETUP.md` - For setup/deployment changes
- `docs/API.md` - For API changes
- `docs/ARCHITECTURE.md` - For architecture changes

### Add Comments For
- Complex algorithms
- Business logic
- Non-obvious code sections
- Configuration choices

## Branch Naming

```
feature/user-authentication
feature/payment-integration
fix/pickup-status-bug
docs/api-documentation
refactor/database-optimization
```

## Issue Tracking

### Bug Report
```markdown
**Title:** [BUG] Brief description

**Reproduction:**
1. Step 1
2. Step 2
3. Step 3

**Expected:** What should happen
**Actual:** What actually happens

**Environment:**
- OS: 
- Browser:
- Version:
```

### Feature Request
```markdown
**Title:** [FEATURE] Brief description

**Problem:** What problem does this solve?

**Solution:** How should this work?

**Alternative:** Any alternative approaches?

**Acceptance Criteria:**
- Criterion 1
- Criterion 2
```

## Review Process

1. **Automated Checks**
   - Tests must pass
   - Code coverage ≥ 80%
   - No ESLint/formatting violations

2. **Code Review**
   - At least one approval required
   - Address reviewer comments
   - Discuss any concerns

3. **Merge**
   - Squash commits if needed
   - Delete feature branch
   - Close related issues

## Performance Guidelines

### Frontend
- Bundle size should not increase significantly
- Images must be optimized
- Code splitting for large components
- Lazy load where appropriate

### Backend
- N+1 query problems must be avoided
- Use pagination for large datasets
- Cache frequently accessed data
- Monitor query performance

## Security

### Frontend
- Validate all user inputs
- Sanitize output
- Use HTTPS only
- Avoid storing sensitive data in localStorage

### Backend
- Validate and sanitize all inputs
- Use parameterized queries
- Implement rate limiting
- Log security events
- Follow OWASP guidelines

## Release Process

1. Update version numbers
2. Update CHANGELOG.md
3. Create git tag
4. Build release artifacts
5. Create GitHub release
6. Deploy to production

## Questions?

- Check existing issues/PRs
- Read documentation in `docs/`
- Email: dev-team@scrapninja.ae
- Discord: [Community Server]

## Attribution

Contributors will be recognized in:
- CONTRIBUTORS.md
- Release notes
- Project documentation

Thank you for contributing to ScrapNinja! 🙏
