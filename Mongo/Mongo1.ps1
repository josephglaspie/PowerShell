<#
#### This Lab is located in C:\Pluralsight ####
-Mongo data is stored as BSON (Binary JSON) bsonspec.org
-A document MUST have an ID, that's the only rule there is no schema.

#>

#Create DB in data C:\Program Files\MongoDB\Server\3.4\data
cd C:\Program Files\MongoDB\Server\3.4\bin
md \data\db
.\mongod.exe #will start mongo #ctrl + c will shut it down
md \Pluralsight\db
$mongodConf=@"
systemLog:
    destination: file
    path: c:\Pluralsight\mongod.log
storage:
    dbPath: c:\Pluralsight\db
"@
$mongodConf | Out-File C:\Pluralsight\mongod.cfg -Force
#Open CMD.exe
'C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --config "C:\Pluralsight\mongod.cfg" --install' #####MUST BE RUN IN CMD not PS
net start mongodb #MUST BE RUN IN CMD not PS

#region shell
mongo.exe #shell
show dbs
db #shows connected db
use foo #switches foo
help

#Create function 
"var stuff = function(name){ var doc = { Name:name, Created: Date(), Type:'r'}; db.foo.save(doc); }"
'stuff()'
load('safer.js') #load script

#load script automatically like a PS profile
$content =Get-Content 'C:\Pluralsight\safer.js' ; Add-Content $content -Path C:\Users\Glaspie\.mongorc.js -Force -PassThru

show collections
db.foo.save({_id:1, x:10})
db.foo.find()
db.users.save({Name:'Bob'})
db.users.find()
ObjectId()
ObjectId().getTimestamp()

#endregion

#region CMD
cd C:\Pluralsight
mongo localhost/admin --eval "db.runCommand({logRotate:1})"
mongo userCount.js #just runs a script
mong safer.js --shell #will run script and remain in shell
    #db.dropDatabase() ##Running this returns function
#endregion