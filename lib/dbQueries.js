module.exports = {
  getAllJobs: getAllJobs,
  getJob: getJob
}

function getAllJobs() {
  return "SELECT id, b2x_job_number, imei_number_in, job_creation_date, created_on, updated_on FROM public.job_head_new order by 1 desc limit 10;";
}

function getJob() {
  return "SELECT id, b2x_job_number, imei_number_in, job_creation_date, created_on, updated_on FROM public.job_head_new WHERE id=$1;";
}
