/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */


module.exports.bootstrap = async function() {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 0;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return;
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  await User.createEach([
    { emailAddress: 'admin@example.com', fullName: 'Ryan Dahl', role: 'admin', password: await sails.helpers.passwords.hashPassword('123456') },
    { emailAddress: 'wingsze1999@example.com', fullName: 'WingSze LEE', role: 'member', password: await sails.helpers.passwords.hashPassword('123456') },
    { emailAddress: 'test@example.com', fullName: 'Crystal LEE', role: 'member', password: await sails.helpers.passwords.hashPassword('123456') },
    { emailAddress: 'anna@gmail.com', fullName: 'Anna Wong', role: 'officer', password: await sails.helpers.passwords.hashPassword('123456') },
  ]);

    const s1 = await User.findOne({emailAddress: "admin@example.com"});
    const s2 = await User.findOne({emailAddress: "wingsze1999@example.com"});
    const s3 = await User.findOne({emailAddress: "test@example.com"});
    const s4 = await User.findOne({emailAddress: "anna@gmail.com"});

  await Files.createEach([
    {fd:"/Users/wingsze/Project2/assets/images/uploads/3fab8b41-0eae-4d42-9410-f37971f2901d.jpeg",type:"image/jpeg", filename:"women7.jpeg", url:"/images/uploads/3fab8b41-0eae-4d42-9410-f37971f2901d.jpeg",uploaded_by:s1.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/3dd5b078-a923-48a3-bb03-c0d9710d0969.jpeg",type:"image/jpeg", filename:"women3.jpeg", url:"/images/uploads/3dd5b078-a923-48a3-bb03-c0d9710d0969.jpeg",uploaded_by:s2.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/93a352b9-b8fd-435c-a200-a70520c7e7b0.jpeg",type:"image/jpeg", filename:"women2.jpeg", url:"/images/uploads/93a352b9-b8fd-435c-a200-a70520c7e7b0.jpeg",uploaded_by:s3.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/28188b49-f960-4002-815b-f395ef445500.jpeg",type:"image/jpeg", filename:"child2.jpeg", url:"/images/uploads/28188b49-f960-4002-815b-f395ef445500.jpeg",uploaded_by:s1.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/470cfad4-8424-41e1-befc-fc21ace76dfd.jpeg",type:"image/jpeg",filename:"elderly3.jpeg",url:"/images/uploads/470cfad4-8424-41e1-befc-fc21ace76dfd.jpeg",uploaded_by:s2.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/74b48d04-9f3e-4bc9-9670-a56047c2e05a.webp",type:"image/webp", filename:"house3.webp", url:"/images/uploads/74b48d04-9f3e-4bc9-9670-a56047c2e05a.webp",uploaded_by:s3.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/bd9d6171-2926-43fb-a5e8-73285315fe24.jpeg",type:"image/jpeg",filename:"elderly1.jpeg",url:"/images/uploads/bd9d6171-2926-43fb-a5e8-73285315fe24.jpeg",uploaded_by:s4.id,},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/b955d647-f5b5-47c7-aef0-df8d220c1c5d.webp",type:"image/webp",filename:"house2.webp",url:"/images/uploads/b955d647-f5b5-47c7-aef0-df8d220c1c5d.webp",uploaded_by:s1.id},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/fe949782-d219-412f-bafd-e8e4c0be8299.webp",type:"image/webp",filename:"house1.webp",url:"/images/uploads/fe949782-d219-412f-bafd-e8e4c0be8299.webp",uploaded_by:s2.id},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/20bf25a9-7330-435b-847c-d3f0f39f2046.webp",type:"image/webp",filename:"child1.webp",url:"/images/uploads/20bf25a9-7330-435b-847c-d3f0f39f2046.webp",uploaded_by:s3.id},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/6ec6483d-7d9b-4faf-83cd-ae9130108dd8.png",type:"image/png",filename:"patient.png",url:"/images/uploads/6ec6483d-7d9b-4faf-83cd-ae9130108dd8.png",uploaded_by:s1.id},
    {fd:"/Users/wingsze/Project2/assets/images/uploads/85a2e34c-7767-4167-89bf-43411b4aac25.jpeg",type:"image/jpeg",filename:"office.jpeg",url:"/images/uploads/85a2e34c-7767-4167-89bf-43411b4aac25.jpeg",uploaded_by:s2.id},
  ]);

  const f1 = await Files.findOne({filename:"women7.jpeg"});
  const f2 = await Files.findOne({filename:"women3.jpeg"});
  const f3 = await Files.findOne({filename:"women2.jpeg"});
  const f4 = await Files.findOne({filename:"child2.jpeg"});
  const f5 = await Files.findOne({filename:"elderly3.jpeg"});
  const f6 = await Files.findOne({filename:"house3.webp"});
  const f7 = await Files.findOne({filename:"elderly1.jpeg"});
  const f8 = await Files.findOne({filename:"house2.webp"});
  const f9 = await Files.findOne({filename:"house1.webp"});
  const f10 = await Files.findOne({filename:"child1.webp"});
  const f11 = await Files.findOne({filename:"patient.png"});
  const f12 = await Files.findOne({filename:"office.jpeg"});
    
  await Ad.createEach([
    { title:"Worked for over 10 yrs as caretakers", adType:"Availability", jobType:"Child Care", scheduleOptions:"regular", location:"Sham Shui Po", contact:"wingsze1999@gmail.com", adStatus:"wait for approval", description:"worked for 15+ families, able to work for whole days with fixed schedules.", salary:"500",remarks:"Did crime check already", availableTimeslot:["[morning][MON]","[morning][THU]","[morning][FRI]","[morning][SAT]","[morning][SUN]","[afternoon][MON]","[afternoon][THU]","[afternoon][FRI]","[afternoon][SAT]","[afternoon][SUN]","[evening][MON]","[evening][THU]","[evening][FRI]","[evening][SAT]","[evening][SUN]"], application_pic:f1.id, owner: s1.id},
    { title:"Able to work as multiple types of care", adType:"Availability", jobType:"Personal Care", scheduleOptions:"regular", location:"Yau Tsim Mong", contact:"75675674 wts available", adStatus:"wait for approval", description:"Have related experiences in taking care of children, the elderly and housekeepers",salary:"250",remarks:"Own bachelor degree", availableTimeslot:["[afternoon][MON]","[afternoon][TUE]","[afternoon][WED]","[afternoon][THU]","[afternoon][FRI]","[afternoon][SAT]","[afternoon][SUN]","[evening][MON]","[evening][TUE]","[evening][WED]","[evening][THU]","[evening][FRI]","[evening][SAT]","[evening][SUN]"], application_pic:f2.id, owner: s2.id},
    { title:"Temporary available (open to work as housekeeper)", adType:"Availability", jobType:"HouseKeeper", scheduleOptions:"one-off", location:"Kwun Tong", contact:"test@gmail.com", adStatus:"wait for approval", description:"I had worked for 50+ jobs last year, and the rest for half year, and open to job now.\r\nLooking for a friendly employer. ",salary:"280",remarks:"", availableTimeslot:["2022-12-23T00:00","2023-01-23T00:00"], application_pic:f3.id, owner: s3.id},
    { title:"Taking care 1 yr old children", adType:"Job", jobType:"Child Care", scheduleOptions:"regular", location:"Kowloon City", contact:"93748294", adStatus:"wait for approval", description:"Need to have experience in taking care of children.",salary:"4500",remarks:"Have cats in the house", availableTimeslot:null, requestedTimeslot:["[morning][SAT]","[morning][SUN]","[afternoon][SAT]","[afternoon][SUN]","[evening][SAT]","[evening][SUN]"], application_pic:f4.id, owner: s1.id},
    { title:"Take care of 80s elderly", adType:"Job", jobType:"Elderly Care", scheduleOptions:"regular", location:"Sha Tin", contact:"38463892", adStatus:"wait for approval", description:"Responsible to take her to the hospital every week. Expected 2 hrs needed for the rounded trip.",salary:"300",remarks:"prefer to have experience in take care of elderly with illness", availableTimeslot:null, requestedTimeslot:["[morning][FRI]","[afternoon][FRI]"], application_pic:f5.id, owner: s2.id},
    { title:"Daily cleaning jobs", adType:"Job", jobType:"HouseKeeper", scheduleOptions:"regular", location:"Sham Shui Po", contact:"76348398", adStatus:"wait for approval", description:"Able to work 2-3 hours per day and 3 days per week. Time is not fixed, able to change based on your schedule.",salary:"200",remarks:"Cant afraid of animals ", availableTimeslot:null, requestedTimeslot:["[morning][MON]","[morning][TUE]","[morning][WED]","[morning][THU]","[morning][FRI]","[afternoon][MON]","[afternoon][TUE]","[afternoon][WED]","[afternoon][THU]","[afternoon][FRI]","[evening][MON]","[evening][TUE]","[evening][WED]","[evening][THU]","[evening][FRI]"], application_pic:f6.id, owner: s3.id},
    { jobType:"Medical Care",title:"Diabetes patient",location:"Tsuen Wan",description:"Take care of 85 years old elderly with diabetes needs ",salary:"300",contact:"52362924",remarks:"",adType:"Job",scheduleOptions:"regular",requestedTimeslot:["[evening][MON]","[evening][TUE]","[evening][WED]","[evening][THU]","[evening][FRI]"],availableTimeslot:null,adStatus:"wait for approval",application_pic:f7.id, owner: s4.id },
    { jobType:"HouseKeeper",title:"cleaning the house",location:"Kwai Tsing",description:"Two bedrooms, one kitchen cleaning. Daily bases (weekdays only). ",salary:"180",contact:"testing@gmail.com",remarks:"Have 2 cats",adType:"Job",scheduleOptions:"regular",requestedTimeslot:["[morning][MON]","[morning][TUE]","[morning][WED]","[morning][THU]","[morning][FRI]"],availableTimeslot:null,adStatus:"wait for approval", application_pic:f8.id, owner: s1.id},
    { jobType:"HouseKeeper",title:"Room cleansing",location:"Kowloon City",description:"大掃除",salary:"200",contact:"93678942",remarks:"",adType:"Job",scheduleOptions:"one-off",requestedTimeslot:["2023-01-31T18:00","2023-01-31T18:00"],availableTimeslot:null,adStatus:"wait for approval", application_pic:f9.id, owner: s2.id},
    { jobType:"Child Care",title:"New born baby",location:"Wan Chai",description:"Take care of one month baby (shower)",salary:"300",contact:"53729826",remarks:"",adType:"Job",scheduleOptions:"regular",requestedTimeslot:["[evening][MON]","[evening][TUE]","[evening][WED]","[evening][THU]","[evening][FRI]","[evening][SAT]","[evening][SUN]"],availableTimeslot:null,adStatus:"wait for approval", application_pic:f10.id, owner: s3.id},
    { jobType:"Personal Care",title:"Pick up from hospital",location:"Yau Tsim Mong",description:"Provide pick-up service (every Friday)",salary:"150",contact:"36547768",remarks:"",adType:"Job",scheduleOptions:"regular",requestedTimeslot:"[afternoon][FRI]",availableTimeslot:null,adStatus:"wait for approval", application_pic:f11.id, owner: s1.id},
    { jobType:"Personal Care",title:"Office cleaning",location:"Tai Po",description:"Cleaning service for office area (3000 ft), need to work every weekday after office hour(4 hours)",salary:"160",contact:"housingAgencyHK@gmail.com",remarks:"",adType:"Job",scheduleOptions:"regular",requestedTimeslot:["[evening][MON]","[evening][TUE]","[evening][WED]","[evening][THU]","[evening][FRI]"],availableTimeslot:null,adStatus:"wait for approval", application_pic:f12.id, owner: s2.id},
    
  ]);

    const a1 = await Ad.findOne({title:"Worked for over 10 yrs as caretakers"});
    const a2 = await Ad.findOne({title:"Able to work as multiple types of care"});
    const a3 = await Ad.findOne({title:"Temporary available (open to work as housekeeper)"});
    const a4 = await Ad.findOne({title:"Taking care 1 yr old children"});
    const a5 = await Ad.findOne({title:"Take care of 80s elderly"});
    const a6 = await Ad.findOne({title:"Daily cleaning jobs"});
    const a7 = await Ad.findOne({title:"Diabetes patient"});
    const a8 = await Ad.findOne({title:"cleaning the house"});
    const a9 = await Ad.findOne({title:"Room cleansing"});
    const a10 = await Ad.findOne({title:"New born baby"});
    const a11 = await Ad.findOne({title:"Pick up from hospital"});
    const a12 = await Ad.findOne({title:"Office cleaning"});
    

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

};
