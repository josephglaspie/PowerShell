var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
    function(val) {
        return (val.length > 0 && val.toLocaleLowerCase() != 'none');
    },
    //Custom error text
    'Select a valid member name.'
];

var requiredStringValidator = [
    function(val) {
        var testVal = val.trim();
        return (testVal.length > 0);
    },
    //Custom error text...
    '{PATH} cannot be empty'
];

var vminventorySchema = new Schema({
    VCName: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    VM_Name: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    DNS_Name: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    UsedSpaceGB: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    UnCommittedGB: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    ProvisionedGB: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    DatastoreName: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    VM_Host: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    VM_Host_Cluster: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    State: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    GuestOS: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    Version: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    vCPUcount: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    VirtualSockets: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    CoresPerSocket: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    MemoryGB: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    NIC: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    NICtype: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    NetworkName: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    IPaddress: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    MAC: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    ToolsVersion: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    ToolsVersionStatus: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    ToolsRunStatus: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    Uuid: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    MoRef: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    IsTemplate: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    Location: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    Env: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    Ntnx: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    Notes: {
        type: String,
        required: true,
        validate: memberNameValidator,
    },
    createdOn: { type: Date, default: Date.now }
});

//Export model...
module.exports = mongoose.model('vminventory', vminventorySchema);