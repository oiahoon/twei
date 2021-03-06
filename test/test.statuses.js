var request = require('request')
  , fs = require('fs')
  , t2w = require('../')
  , should = require('chai').should()
  
  , confPath = process.env.HOME + '/.tweirc'
  , config = new (require('../lib/config').Config)(confPath)
  ;
  
var accessToken = config.get('tsina.access_token');
  
  
describe('fetch statuses', function(){
  var g = 'status';
  var statuses = Object.keys(require('../').getApiGroup('statuses'));
  
  afterEach(function(done){
    setTimeout(function wait(){
      //too fast?
      done();
    }, 3000);
  });
  
  statuses.forEach(function(name){
  
    it(name, function(done){
      
      t2w.executeApi('statuses.' + name, {
          access_token: accessToken
        , count: 5
      }).on('success', function(reply){
        reply.should.be.a('object');
        reply.should.not.have.property('error');
        
        if(name != 'reposts'){
          reply.should.have.property('statuses');
          reply.statuses.should.be.a('array');
        }else{
          reply.should.have.property('reposts');
          reply.reposts.should.be.a('array');
        }
        
        done();
      }).on('error', function(err){
        should.not.exist(err);
        done();
      });
    });
    
  });

});