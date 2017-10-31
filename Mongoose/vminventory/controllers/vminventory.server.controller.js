var vminventory = require('../models/vminventory.server.model.js');

exports.list = function(req, res) {
    var query = vminventory.find();

    query.sort({ createdOn: 'desc' })
        .limit(12)
        .exec(function(err, results) {
            res.render('index', { title: 'vminventory - List', notes: results });
        });

};

/*
exports.filterByMember = function(req, res) {
    var query = vminventory.find();
    var filter = req.body.memberName;

    query.sort({ createdOn: 'desc' });

    if (filter.length > 0) {
        query.where({ memberName: filter })
    }

    query.exec(function(err, results) {
        res.render('index', { title: 'vminventory - List', notes: results });
    });
};
*/

exports.create = function(req, res) {
    var entry = new vminventory({
        VCName: req.body.VCName,
        VM_Name: req.body.VM_Name,
        DNS_Name: req.body.DNS_Name,
        UsedSpaceGB: req.body.UsedSpaceGB,
        UnCommittedGB: req.body.UnCommittedGB,
        ProvisionedGB: req.body.ProvisionedGB,
        DatastoreName: req.body.DatastoreName,
        VM_Host: req.body.VM_Host,
        VM_Host_Cluster: req.body.VM_Host_Cluster,
        State: req.body.State,
        GuestOS: req.body.GuestOS,
        Version: req.body.Version,
        vCPUcount: req.body.vCPUcount,
        VirtualSockets: req.body.VirtualSockets,
        CoresPerSocket: req.body.CoresPerSocket,
        MemoryGB: req.body.MemoryGB,
        NIC: req.body.NIC,
        NICtype: req.body.NICtype,
        NetworkName: req.body.NetworkName,
        IPaddress: req.body.IPaddress,
        MAC: req.body.MAC,
        ToolsVersion: req.body.ToolsVersion,
        ToolsVersionStatus: req.body.ToolsVersionStatus,
        ToolsRunStatus: req.body.ToolsRunStatus,
        Uuid: req.body.Uuid,
        MoRef: req.body.MoRef,
        IsTemplate: req.body.IsTemplate,
        Location: req.body.Location,
        Env: req.body.Env,
        Ntnx: req.body.Ntnx,
        Notes: req.body.Notes
    });

    entry.save(function(err) {
        if (err) {
            var errMsg = 'Sorry, there was an error saving the stand-up meeting note. ' + err;
            res.render('newnote', { title: 'vminventory - New Note (error)', message: errMsg });
        } else {
            console.log('Stand-up meeting note was saved!');
            // Redirect to the home page to display list of notes...
            res.redirect(301, '/');
        }
    });

};

exports.getNote = function(req, res) {
    res.render('newnote', { title: 'vminventory - New Note' });
};