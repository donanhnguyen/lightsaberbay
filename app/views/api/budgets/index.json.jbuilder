json.array! @all_budgets do |budget|
    json.id budget.id
    json.month budget.month
    json.year budget.year
    json.salary budget.salary
    json.user_id budget.user_id
    json.created_at budget.created_at
    json.updated_at budget.updated_at
end