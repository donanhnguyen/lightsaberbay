export const fetchLightsabers = () => {
    return $.ajax({
        method: 'GET',
        url: `api/lightsabers`
    })
};

// export const createBudget = (user_id, budget) => (
//     $.ajax({
//         method: 'POST',
//         url: `api/users/${user_id}/budgets`,
//         data: {budget}
//     })
// );

// export const deleteBudget = (user_id, budget_id) => (
//     $.ajax({
//         method: 'DELETE',
//         url: `api/users/${user_id}/budgets/${budget_id}`
//     })
// )
