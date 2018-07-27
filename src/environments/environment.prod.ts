export const environment = {
  production: true,
  // apiUrl: 'http://tlapp.us-west-2.elasticbeanstalk.com/api'
  apiUrl: 'http://' + location.hostname + ':' + (parseInt(location.port, 10) - 1) + '/api',
};

