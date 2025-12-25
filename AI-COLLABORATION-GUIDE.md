# 🤖 AI Collaboration Guide - Working with Claude on Agent Engineering Projects

## Overview

This guide explains how to effectively collaborate with Claude (me!) when working on this Agent Engineering Todo App. It covers best practices for prompts, bug reporting, feature requests, and iterative development.

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Context Provision](#context-provision)
3. [Feature Development](#feature-development)
4. [Bug Fixing](#bug-fixing)
5. [Code Review & Refactoring](#code-review--refactoring)
6. [Testing](#testing)
7. [Prompt Templates](#prompt-templates)
8. [Best Practices](#best-practices)

---

## Quick Reference

### ⚡ Fast Commands

```markdown
# New Feature
"Add [feature] to the todo app. Include tests and update docs."

# Fix Bug
"There's a bug: [describe behavior]. Expected: [what should happen]. Actual: [what happens]."

# Refactor
"Refactor [component/service] to [improvement]. Maintain all tests passing."

# Review
"Review the [file/feature] for best practices and suggest improvements."

# Test
"Add tests for [feature/scenario]. Cover edge cases."

# Update
"Update [feature] to support [new requirement]. Keep backward compatibility."
```

---

## Context Provision

### 🎯 Always Provide Context

When starting a conversation about this project, provide context:

#### **Method 1: Reference Documentation (Best)**
```markdown
I'm working on the Agent Engineering Todo App at /Users/minhpham/working/agent/todo-agent

Context: [Describe what you need]
- Check INSTRUCTIONS.md for architecture
- Check TESTING.md for test patterns
- Current issue: [your issue]
```

#### **Method 2: Specify Files**
```markdown
Working on todo app. Files involved:
- src/components/TodoItem.jsx
- src/components/TodoItem.test.jsx

Issue: [describe issue]
```

#### **Method 3: Show Current State**
```markdown
Current code in TodoItem.jsx:
[paste relevant code]

Want to: [describe goal]
```

### 📍 What Context Helps

**Good Context:**
- Project location
- What you're trying to do
- What's not working (with error messages)
- Expected vs actual behavior
- Files you're working with

**Less Helpful:**
- Vague descriptions
- No error messages
- Missing expected behavior
- No file references

---

## Feature Development

### 🚀 Adding New Features

#### Template: New Feature Request

```markdown
**Feature Request**

Add [feature name] to the todo app.

**Requirements:**
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

**User Story:**
As a [user type], I want to [action] so that [benefit].

**Technical Notes:**
- Should integrate with existing [component/service]
- Needs to work with [feature]
- Consider [edge case]

**Testing:**
- Unit tests for [component]
- Integration tests for [workflow]
- E2E test for [user journey]

**Documentation:**
- Update INSTRUCTIONS.md if architecture changes
- Update README.md if user-facing
```

#### Example: Add Priority Feature

```markdown
**Feature Request**

Add priority levels to todos (Low, Medium, High).

**Requirements:**
- Dropdown in TodoForm to select priority
- Display priority badge in TodoItem
- Color-coded badges (green=low, yellow=medium, red=high)
- Default priority is "Medium"
- Can update priority when editing todo

**User Story:**
As a user, I want to assign priority levels to my todos so that I can focus on important tasks first.

**Technical Notes:**
- Add priority field to todoService.js
- Update TodoForm.jsx with dropdown
- Update TodoItem.jsx to display badge
- Modify localStorage schema

**Testing:**
- Unit tests for priority CRUD in todoService
- Component tests for TodoForm dropdown
- Component tests for TodoItem badge display
- Integration test for complete priority workflow
- E2E test for creating/editing with priority

**Documentation:**
- Update INSTRUCTIONS.md with new data model
- Add priority to extension ideas (mark as completed)
```

### 🎨 UI/UX Changes

```markdown
**UI Change Request**

Improve [component/feature] design/UX.

**Current State:**
[Describe current UI]

**Desired State:**
[Describe desired UI]

**Mockup/Reference:** (if available)
[Link or description]

**Considerations:**
- Mobile responsive
- Accessibility (ARIA labels, keyboard navigation)
- Maintain Tailwind CSS patterns
- Keep loading states
```

### 🔧 Technical Improvements

```markdown
**Technical Improvement**

Optimize/refactor [component/service/feature].

**Current Issue:**
[Performance issue, code smell, complexity, etc.]

**Proposed Solution:**
[Your idea or ask for suggestions]

**Constraints:**
- Must maintain backward compatibility
- All existing tests must pass
- No breaking changes to API
- Maintain test coverage above 90%
```

---

## Bug Fixing

### 🐛 Reporting Bugs

#### Template: Bug Report

```markdown
**Bug Report**

**Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [Third step]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Error Messages:** (if any)
```
[Paste error from console]
```

**Environment:**
- Browser: [Chrome/Firefox/Safari]
- Node version: [output of `node -v`]
- npm version: [output of `npm -v`]

**Files Involved:**
- [Component or service where bug occurs]

**Screenshots/Videos:** (if applicable)
[Describe what you see]

**Additional Context:**
[Any other relevant information]
```

#### Example: Bug Report

```markdown
**Bug Report**

**Description:**
Todos are not persisting after page reload

**Steps to Reproduce:**
1. Create a new todo "Test todo"
2. Refresh the page (Cmd+R)
3. Todo disappears

**Expected Behavior:**
Todo should persist and be visible after page reload

**Actual Behavior:**
Todo list is empty after reload

**Error Messages:**
```
localStorage.getItem returns null
```

**Environment:**
- Browser: Chrome 120
- Node: v18.17.0
- npm: 9.6.7

**Files Involved:**
- src/services/todoService.js
- src/hooks/useTodos.js

**Additional Context:**
This worked yesterday, might be related to recent changes in todoService.js
```

### 🔍 Investigation Request

```markdown
Help me debug this issue:

**Issue:**
[Describe what's wrong]

**What I've Tried:**
1. [Thing 1]
2. [Thing 2]

**Code:**
```javascript
// Paste relevant code
```

**Question:**
[Specific question about the issue]
```

---

## Code Review & Refactoring

### 👀 Code Review Request

```markdown
**Code Review Request**

Please review [file/feature/PR] for:
- [ ] Code quality and best practices
- [ ] Agent Engineering principles adherence
- [ ] Test coverage
- [ ] Performance issues
- [ ] Security concerns
- [ ] Accessibility
- [ ] Documentation

**Specific Concerns:**
[Any specific areas you're unsure about]

**Code:**
[Show the code or reference files]
```

### 🔨 Refactoring Request

```markdown
**Refactoring Request**

Refactor [component/service] to improve [aspect].

**Current Issues:**
- [Issue 1: e.g., too complex, hard to test]
- [Issue 2: e.g., tight coupling]
- [Issue 3: e.g., repeated code]

**Goals:**
- Maintain functionality
- Improve readability
- Better testability
- Follow Agent Engineering patterns

**Constraints:**
- All tests must pass
- No breaking changes
- Maintain test coverage
```

---

## Testing

### 🧪 Test Writing Request

```markdown
**Test Request**

Add tests for [feature/component].

**Test Types Needed:**
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests

**Scenarios to Cover:**
1. [Happy path scenario]
2. [Edge case 1]
3. [Edge case 2]
4. [Error scenario]

**Current Coverage:** [X%]
**Target Coverage:** [Y%]

**Files:**
- Source: [file to test]
- Test: [where tests should go]
```

### 🐛 Test Debugging

```markdown
**Test Issue**

Test "[test name]" is failing.

**Error Message:**
```
[Paste error]
```

**Test Code:**
```javascript
// Paste test code
```

**What I Expected:**
[Expected outcome]

**What's Happening:**
[Actual outcome]

**Context:**
[Related changes or environment info]
```

---

## Prompt Templates

### Template 1: Simple Feature Addition

```markdown
Add [feature] to the todo app.

Requirements:
- [requirement 1]
- [requirement 2]

Include:
- Implementation in appropriate files
- Unit tests
- Integration test if needed
- Update documentation

Follow Agent Engineering patterns (Services → Hooks → Components)
```

### Template 2: Bug Fix with Context

```markdown
Bug: [short description]

Behavior:
- Expected: [what should happen]
- Actual: [what happens]
- Steps: [1, 2, 3]

Error:
```
[error message if any]
```

Files: [list files]

Fix this bug and add a test to prevent regression.
```

### Template 3: Feature with TDD

```markdown
I want to add [feature] using TDD approach.

1. First, write failing tests for:
   - [scenario 1]
   - [scenario 2]

2. Then implement the feature

3. Update documentation

Feature details: [describe feature]
```

### Template 4: Architecture Question

```markdown
Question about architecture:

I want to [do something].

Current structure:
- [describe current setup]

Options I'm considering:
1. [Option 1]
2. [Option 2]

Which follows Agent Engineering principles better? Why?
```

### Template 5: Performance Optimization

```markdown
Optimize [component/feature] performance.

Current Issue:
- [Describe performance problem]
- [Metrics if available]

Context:
- [When does it happen]
- [How noticeable]

Constraints:
- Maintain functionality
- Keep tests passing
- Follow existing patterns
```

### Template 6: Full Feature Pipeline

```markdown
**Complete Feature Pipeline**

Feature: [name]

Phase 1 - Planning:
- Review architecture fit
- Suggest implementation approach
- Identify affected files

Phase 2 - Implementation:
- Create/modify services
- Add/update hooks
- Create/update components
- Follow Agent Engineering separation

Phase 3 - Testing:
- Write unit tests (target: 100% for new code)
- Write integration tests
- Write E2E test for user flow

Phase 4 - Documentation:
- Update INSTRUCTIONS.md
- Update README.md if user-facing
- Add code comments

Phase 5 - Review:
- Check test coverage
- Review for best practices
- Verify Agent Engineering principles

Start with Phase 1 planning.
```

---

## Best Practices

### ✅ Do's

#### **Be Specific**
```markdown
❌ "Fix the form"
✅ "Fix the TodoForm so it prevents submission of todos with only whitespace"
```

#### **Provide Context**
```markdown
❌ "Add a feature"
✅ "Add priority levels to todos. Update todoService.js, TodoForm.jsx, and TodoItem.jsx. Include tests."
```

#### **Show What You Tried**
```markdown
I tried to fix this by [approach], but [what happened].
Can you suggest a better approach?
```

#### **Reference Documentation**
```markdown
According to INSTRUCTIONS.md, the service layer should be framework-agnostic.
How should I implement [feature] following this pattern?
```

#### **Ask for Explanation**
```markdown
Can you explain why this approach is better for Agent Engineering principles?
```

#### **Request Tests**
```markdown
Add comprehensive tests including edge cases like empty input, special characters, and very long text.
```

#### **Specify Constraints**
```markdown
Keep backward compatibility with existing todos in localStorage.
```

### ❌ Don'ts

#### **Too Vague**
```markdown
❌ "It doesn't work"
❌ "Make it better"
❌ "Add stuff"
```

#### **No Context**
```markdown
❌ Just pasting error without code
❌ "Fix this" without showing what
```

#### **Unrealistic Expectations**
```markdown
❌ "Rewrite entire app" (too big, break it down)
❌ "Make it look like [complex app]" (be specific about features)
```

#### **Skipping Tests**
```markdown
❌ "Just implement feature, skip tests" (tests are crucial!)
```

---

## Real-World Examples

### Example 1: Adding Search Feature

```markdown
**Feature Request: Add Search Functionality**

Add a search bar to filter todos by title.

**Requirements:**
- Search input above the todo list
- Real-time filtering as user types
- Case-insensitive search
- Show count of filtered results
- Clear search button (X icon)
- No todos found message when search has no results

**Technical Approach:**
- Add search state in App.jsx
- Filter todos before passing to TodoList
- Update statistics to reflect filtered todos
- Keep URL clean (no query params for now)

**User Experience:**
- Search is instant (no debounce needed for small lists)
- Pressing Escape clears search
- Search persists while editing/completing todos
- Search is reset when deleting the last todo

**Testing:**
- Unit test: filter logic
- Integration: search with create/edit/delete operations
- E2E: user types in search, sees filtered results

**Files to Update:**
- src/App.jsx (add search state and filtering)
- src/components/TodoSearch.jsx (new component)
- Add tests for TodoSearch.test.jsx
- Update App.integration.test.jsx
- Add E2E test scenario

Follow Agent Engineering patterns. Implement with TDD approach.
```

### Example 2: Bug Fix Request

```markdown
**Bug: Completed Todos Don't Show Strikethrough**

**Description:**
When I check a todo as completed, the checkbox checks but the text doesn't get strikethrough styling.

**Steps to Reproduce:**
1. Create a todo "Buy milk"
2. Click the checkbox
3. Checkbox is checked but text still looks normal

**Expected:**
Text should have line-through style when checked

**Actual:**
Text stays normal without line-through

**Browser:** Chrome 120
**Code:** src/components/TodoItem.jsx

**What I See in DevTools:**
The className doesn't include 'line-through' even though todo.completed is true.

**Recent Changes:**
I refactored TodoItem yesterday to improve the layout.

Please:
1. Fix the styling issue
2. Add a test to prevent this regression
3. Verify E2E test catches this (if not, update it)
```

### Example 3: Architecture Question

```markdown
**Architecture Question: Where to Put Filter Logic?**

I'm adding a filter feature (All, Active, Completed).

Should I:

**Option A:** Put filter state and logic in App.jsx
- Pros: Simple, everything in one place
- Cons: App.jsx getting big

**Option B:** Create a useFilter hook
- Pros: Reusable, testable separately
- Cons: Might be overkill for simple filter

**Option C:** Put in a FilterContext
- Pros: Available anywhere
- Cons: Seems like overkill

Which follows Agent Engineering principles best?
What would you recommend and why?
```

### Example 4: Test-Driven Development

```markdown
**TDD Request: Add Due Date Feature**

Let's build this with TDD.

**Feature:** Add due date to todos

**Step 1: Write Failing Tests**
Please write tests for:

1. todoService.test.js:
   - createTodo accepts optional dueDate parameter
   - updateTodo can update dueDate
   - dueDate is stored as ISO string

2. TodoForm.test.jsx:
   - Renders date input
   - Submits todo with selected date
   - Date is optional (can submit without date)

3. TodoItem.test.jsx:
   - Displays due date if present
   - Shows "overdue" indicator if date is past
   - Doesn't crash if no date

4. App.integration.test.jsx:
   - Can create todo with due date
   - Can update todo due date
   - Due date persists in localStorage

**Step 2: Implement**
After tests are written and failing, implement the feature.

**Step 3: Verify**
All tests pass, coverage maintained above 90%.

Let's start with Step 1 - write the failing tests.
```

### Example 5: Performance Investigation

```markdown
**Performance Issue: App Feels Slow with 100+ Todos**

**Symptoms:**
- Adding new todo takes 2-3 seconds
- Scrolling feels janky
- Browser tab says "not responding" briefly

**Environment:**
- 150 todos in localStorage
- Chrome 120
- MacBook Pro M1

**What I've Checked:**
1. Console shows no errors
2. Network tab shows no requests (localStorage only)
3. React DevTools shows TodoList re-rendering on every action

**Question:**
Is this a React Query issue? Component rendering issue?
Can you:
1. Identify the bottleneck
2. Suggest optimization strategies
3. Maintain test coverage
4. Keep Agent Engineering patterns

**Files:**
- src/App.jsx
- src/hooks/useTodos.js
- src/components/TodoList.jsx
- src/components/TodoItem.jsx
```

### Example 6: Refactoring Request

```markdown
**Refactor Request: TodoItem is Too Complex**

The TodoItem component has grown to 150 lines and does too many things:
- Rendering
- Edit mode state
- Edit form handling
- Delete confirmation
- Keyboard shortcuts

**Current Issues:**
- Hard to test all branches
- Hard to understand at a glance
- Violates Single Responsibility Principle

**Proposed Refactoring:**
Break into smaller components:
- TodoItem (container)
- TodoDisplay (read mode)
- TodoEdit (edit mode)
- TodoActions (buttons)

**Goals:**
- Each component < 50 lines
- Better testability
- Maintain all functionality
- Follow Agent Engineering patterns
- Keep all existing tests passing
- Add tests for new components

**Constraints:**
- No changes to parent components (TodoList, App)
- No breaking changes to props interface
- Maintain accessibility features
- Keep keyboard shortcuts working

Please suggest the best approach and implement it.
```

---

## Advanced Patterns

### 🔄 Iterative Development

```markdown
**Iteration 1:**
Build basic version of [feature] with core functionality only.

**Iteration 2:**
Add edge case handling and validation.

**Iteration 3:**
Add advanced features and polish.

**Iteration 4:**
Optimize performance and refine UX.

Let's start with Iteration 1.
```

### 🎯 Spike/Exploration

```markdown
**Exploration Request**

I want to explore adding [feature] but not sure of the best approach.

Can you:
1. Suggest 2-3 implementation approaches
2. List pros/cons of each
3. Recommend one based on Agent Engineering principles
4. Show a simple proof of concept

Don't implement fully yet, just explore options.
```

### 📊 Code Review Checklist

```markdown
**Pre-Commit Review**

Review my changes for:

**Functionality:**
- [ ] Feature works as expected
- [ ] Edge cases handled
- [ ] Error handling present

**Architecture:**
- [ ] Follows Agent Engineering patterns
- [ ] Services are framework-agnostic
- [ ] Components are presentational
- [ ] Proper separation of concerns

**Testing:**
- [ ] Unit tests for new code
- [ ] Integration tests for workflows
- [ ] E2E test for user journey
- [ ] Coverage above 90%
- [ ] All tests passing

**Code Quality:**
- [ ] DRY (Don't Repeat Yourself)
- [ ] SOLID principles
- [ ] Meaningful names
- [ ] Comments where needed
- [ ] No console.logs

**Documentation:**
- [ ] INSTRUCTIONS.md updated if needed
- [ ] README.md updated if user-facing
- [ ] Code comments for complex logic

Files changed:
[List files]

Please review and suggest improvements.
```

---

## Tips for Effective Collaboration

### 🎯 Getting the Best Results

1. **Start Conversations with Context**
   ```markdown
   Working on Agent Engineering Todo App at [path].
   Need help with [specific thing].
   ```

2. **Break Big Tasks into Small Steps**
   ```markdown
   Let's add this feature in phases:
   Phase 1: Core functionality
   Phase 2: Tests
   Phase 3: Edge cases
   Phase 4: Polish
   ```

3. **Ask for Explanations**
   ```markdown
   Why is this approach better than [alternative]?
   ```

4. **Reference Existing Patterns**
   ```markdown
   Following the pattern used in TodoItem, how should I...
   ```

5. **Be Open to Suggestions**
   ```markdown
   Here's my approach, but I'm open to better suggestions.
   ```

6. **Request Reviews**
   ```markdown
   Before I commit, can you review this for [specific concerns]?
   ```

### 🚫 Common Pitfalls to Avoid

1. **Vague Requests**
   - Bad: "Make it better"
   - Good: "Improve performance of TodoList when rendering 100+ items"

2. **Skipping Context**
   - Bad: "Fix this" [paste code]
   - Good: "In TodoItem.jsx, the edit functionality isn't working because..."

3. **No Testing Consideration**
   - Bad: "Just add the feature"
   - Good: "Add the feature with unit and integration tests"

4. **Ignoring Documentation**
   - Bad: Implement without checking INSTRUCTIONS.md
   - Good: "According to the architecture in INSTRUCTIONS.md..."

5. **Too Big at Once**
   - Bad: "Rebuild the entire app with [10 new features]"
   - Good: "Let's add one feature at a time, starting with..."

---

## Quick Decision Tree

```
Do you want to...

├─ Add a new feature?
│  └─ Use "Feature Development" section
│     └─ Include requirements, tests, docs
│
├─ Fix a bug?
│  └─ Use "Bug Fixing" section
│     └─ Include steps to reproduce, expected vs actual
│
├─ Improve existing code?
│  └─ Use "Code Review & Refactoring" section
│     └─ Specify what to improve and why
│
├─ Add/fix tests?
│  └─ Use "Testing" section
│     └─ Specify scenarios and coverage goals
│
├─ Understand something?
│  └─ Ask directly with context
│     └─ Reference relevant documentation
│
└─ Explore options?
   └─ Use "Spike/Exploration" pattern
      └─ Ask for comparisons and recommendations
```

---

## Summary

### 🎯 Key Principles

1. **Provide Context** - Always mention the project and what you're working on
2. **Be Specific** - Clear requirements lead to better solutions
3. **Include Tests** - Testing is integral to Agent Engineering
4. **Follow Patterns** - Reference and maintain existing architecture
5. **Document Changes** - Update relevant docs
6. **Iterate** - Build incrementally, not all at once
7. **Ask Questions** - Understanding the "why" helps you grow

### ✅ Every Request Should Have

- [ ] Clear description of what you want
- [ ] Context about the project/files
- [ ] Expected outcome
- [ ] Test requirements (if applicable)
- [ ] Documentation needs (if applicable)

### 🚀 Remember

I'm here to help you build quality software following Agent Engineering principles. The more context and clarity you provide, the better I can assist. Don't hesitate to:

- Ask for explanations
- Request alternatives
- Challenge suggestions
- Iterate on solutions
- Learn the patterns

Let's build something great together! 🎉

---

## Example Session

Here's a complete example session for adding a feature:

```markdown
**Session Start**

Hi! I'm working on the Agent Engineering Todo App at /Users/minhpham/working/agent/todo-agent

I want to add a search feature to filter todos. Can we do this in phases?

Phase 1: Plan the approach
Phase 2: Implement with TDD
Phase 3: Add E2E test
Phase 4: Update documentation

Let's start with Phase 1. What's the best way to structure this following Agent Engineering patterns?

---

[Claude responds with architectural suggestions]

---

Great! Let's go with your suggested approach. 

Phase 2: Please write the failing tests first for:
- Search input rendering
- Filter logic
- Search clearing
- No results state

After tests are written, we'll implement the feature.

---

[Claude writes tests, they fail]

---

Perfect! Tests are failing as expected. Now please implement the search feature to make these tests pass.

Follow the Agent Engineering pattern: update App.jsx for state management, create SearchInput component for UI.

---

[Claude implements, tests pass]

---

Excellent! All tests pass. 

Phase 3: Add E2E test that:
1. Creates 3 todos
2. Searches for one
3. Verifies only that todo appears
4. Clears search
5. Verifies all todos appear

---

[Claude adds E2E test]

---

Great! 

Phase 4: Update documentation:
- Add search feature to README.md
- Update INSTRUCTIONS.md with search component
- Add to extension ideas (mark complete)

After that, please review everything for best practices.

---

[Claude updates docs and reviews]

---

Perfect! Thank you! Can you create a summary of what we added for my commit message?

---

[Session complete]
```

---

**This is your guide to working with me effectively! Bookmark it and refer back whenever you need. Happy coding! 🚀**
