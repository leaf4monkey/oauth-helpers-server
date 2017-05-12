/**
 * Created on 2017/5/6.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
import CommonService from 'meteor/leaf4monkey:oauth-helpers-common';
import {OAuth} from 'meteor/oauth';
import {Accounts} from 'meteor/accounts-base';

const completeFields = function (fields, serviceName) {
    if (!fields || !fields.length) {
        return fields;
    }
    let prefix = `services.${serviceName}.`;
    let regex = new RegExp(`^${prefix.replace(/\./g, '\\.')}`);
    return fields.map(field => regex.test(field) && `services.${serviceName}.${field}` || field);
};

class Service extends CommonService {
    constructor (serviceName) {
        super(serviceName);
    }

    register (...args) {
        OAuth.registerService(this.serviceName, ...args);
    }

    registerRetrieveCredential () {
        this.retrieveCredential = function(credentialToken, credentialSecret) {
            return OAuth.retrieveCredential(credentialToken, credentialSecret);
        };
    }

    addAutopublishFields (forLoggedInUser, forOtherUsers, isShorthand) {
        if (isShorthand) {
            let {serviceName} = this;
            forLoggedInUser = completeFields(forLoggedInUser, serviceName);
            forOtherUsers = completeFields(forOtherUsers, serviceName);
        }
        Accounts.addAutopublishFields(forLoggedInUser, forOtherUsers);
    }
}

export default Service;