const {notError} = require('not-error');

class notInformExceptionDeployOneFailed extends notError{
    constructor(context, e){
        super('not-inform:exception_deploy_one_failed', context, e);        

    }
}

module.exports.notInformExceptionDeployOneFailed=notInformExceptionDeployOneFailed;

class notInformExceptionDeployCycleFailed extends notError{
    constructor(context, e){
        super('not-inform:exception_deploy_cycle_failed', context, e);        

    }
}

module.exports.notInformExceptionDeployCycleFailed=notInformExceptionDeployCycleFailed;