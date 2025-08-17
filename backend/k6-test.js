import http from 'k6/http';
import { check, sleep } from 'k6';

// Test configuration
export let options = {
  vus: 10,          // Number of virtual users
  duration: '15s',  // Test duration
};

export default function () {
  // ----------------------
  // Summarize endpoint test
  // ----------------------
  const summarizeUrl = 'http://localhost:5000/api/summarize';
  const summarizePayload = JSON.stringify({
    transcriptText: 'This is a test transcript for load testing your summarization endpoint.',
    prompt: 'Summarize in bullet points for executives.'
  });
  const summarizeParams = {
    headers: { 'Content-Type': 'application/json' },
  };

  const summarizeRes = http.post(summarizeUrl, summarizePayload, summarizeParams);

  check(summarizeRes, {
    'summarize status is 200': (r) => r.status === 200,
    'summarize response has summary': (r) => r.body.includes('summary'),
  });

  sleep(1); // wait 1 second

  // ----------------------
  // Share endpoint test
  // ----------------------
  const shareUrl = 'http://localhost:5000/api/share';
  const sharePayload = JSON.stringify({
    to: ['test1@example.com', 'test2@example.com'],
    subject: 'Test Meeting Summary',
    text: 'This is a test summary for load testing email sharing.'
  });
  const shareParams = {
    headers: { 'Content-Type': 'application/json' },
  };

  const shareRes = http.post(shareUrl, sharePayload, shareParams);

  check(shareRes, {
    'share status is 200': (r) => r.status === 200,
    'share response has success': (r) => r.body.includes('Job enqueued'),
  });

  sleep(1); // wait 1 second
}


// Test Result ->
// TOTAL RESULTS

//     checks_total.......: 176    8.491998/s
//     checks_succeeded...: 67.04% 118 out of 176
//     checks_failed......: 32.95% 58 out of 176

//     ✗ summarize status is 200
//       ↳  84% — ✓ 37 / ✗ 7
//     ✗ summarize response has summary
//       ↳  84% — ✓ 37 / ✗ 7
//     ✓ share status is 200
//     ✗ share response has success
//       ↳  0% — ✓ 0 / ✗ 44

//     HTTP
//     http_req_duration..............: avg=887.46ms min=108.21ms med=421.14ms max=4.66s p(90)=4.33s p(95)=4.38s
//       { expected_response:true }...: avg=586.7ms  min=108.21ms med=381.87ms max=4.66s p(90)=1.22s p(95)=1.26s
//     http_req_failed................: 7.95% 7 out of 88
//     http_reqs......................: 88    4.245999/s

//     EXECUTION
//     iteration_duration.............: avg=3.9s     min=2.53s    med=2.72s    max=7.1s  p(90)=6.76s p(95)=6.77s
//     iterations.....................: 44    2.123/s
//     vus............................: 1     min=1       max=10
//     vus_max........................: 10    min=10      max=10

//     NETWORK
//     data_received..................: 50 kB 2.4 kB/s
//     data_sent......................: 25 kB 1.2 kB/s




// running (20.7s), 00/10 VUs, 44 complete and 0 interrupted iterations
