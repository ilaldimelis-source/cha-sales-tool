/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,
    'keyframes-name-pattern': null,
    'selector-id-pattern': null,

    // Disabled: Stylelint cannot auto-fix `word-break: break-word`, and hand-editing
    // (e.g. overflow-wrap / word-break: normal) risks subtle line-break changes in chat
    // bubbles and receipt review. `break-word` is universally supported; deprecation is
    // spec churn, not a practical defect for this app.
    'declaration-property-value-keyword-no-deprecated': null,

    // Disabled: autofix rewrites chained :not(A):not(B) into :not(A, B), which lowers
    // specificity vs three separate :not() (Selectors Level 4). That can change cascade
    // winners (e.g. .main button hovers, Sales Tracker zebra rows) with no safe mechanical fix.
    'selector-not-notation': null
  }
};
