import Guardian from 'guardian-js'; 

const guardian = new Guardian('d3574da0-0298-4f5a-b223-e8ca13b9dfdc', false); 

api.content.search('football', {
    tag: 'sports'
    .then(function(response){
        console.log(response.body); //do something with the response
      })
      .catch(function(err){
        console.log(err);
      })
});

