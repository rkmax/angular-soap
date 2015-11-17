angular.module('angularSoap', [])

.factory("$soap",['$q',function($q){
	return {
		post: function(url, action, params, headers){
			var deferred = $q.defer();
			
			//Create SOAPClientParameters
			var soapParams = new SOAPClientParameters();
			if(params){
				for(var param in params){
					soapParams.add(param, params[param]);
				}
			}
			
			//Create Callback
			var soapCallback = function(e){
				if(e.constructor.toString().indexOf("function Error()") != -1){
					deferred.reject("An error has occurred.");
				} else {
					deferred.resolve(e);
				}
			}
			
			SOAPClient.invoke(url, action, soapParams, true, headers, soapCallback);

			return deferred.promise;
		},
		setCredentials: function(username, password){
			SOAPClient.username = username;
			SOAPClient.password = password;
		}
	}
}]);
