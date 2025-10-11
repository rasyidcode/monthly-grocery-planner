export default async function checkPlan(req, res, next) {
  const { planId, id } = req.params;
  const plan = await pool.query(
    "SELECT * FROM plans WHERE id = $1 AND user_id = $2",
    [planId, req.user.id]
  );
  if (!plan.rows[0]) {
    next(createError(400, "Bad request"));
    return;
  }
}
