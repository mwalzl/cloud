# Cloud Computing Applikation


## OKD

**Build and Deploy Guide:**  

Set Path

```bash
PATH=$PATH:$HOME/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit
```

Running Openshift Cluster

```bash
oc cluster up
```
Checkout Project

```bash
git clone https://github.com/mwalzl/cloud.git
cd cloud
```

Create the application

```bash
oc new-app --template=postgresql-persistent -p POSTGRESQL_USER=snippet -p POSTGRESQL_PASSWORD=keines -p POSTGRESQL_DATABASE=snippet --name=snippetdb
```

Database Init
```bash
oc get svc -l app=snippetdb
```
```bash
psql -h <CLUSTER IP> -U snippet -W snippet <db_init.sql
```

```bash
psql -h <CLUSTER IP> -U snippet -W snippet
```

Create the App
```bash
oc new-app . --name snippet_app -e DATABASE_URL="postgres://snippet:keines@postgresql.myproject.svc.cluster.local:5432/snippet"
```

```bash
--> Found image 93de123 (2 years old) in image stream "openshift/nodejs" under tag "10" for "nodejs"

    Node.js 10.12.0
    ---------------
    Node.js  available as docker container is a base platform for building and running various Node.js  applications and frameworks. Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

    Tags: builder, nodejs, nodejs-10.12.0

    * The source repository appears to match: nodejs
    * A source build using source code from https://github.com/mwalzl/cloud.git#master will be created
      * The resulting image will be pushed to image stream tag "snippetapp:latest"
      * Use 'start-build' to trigger a new build
    * This image will be deployed in deployment config "snippetapp"
    * Port 8080/tcp will be load balanced by service "snippetapp"
      * Other containers can access this service through the hostname "snippetapp"

--> Creating resources ...
    imagestream.image.openshift.io "snippetapp" created
    buildconfig.build.openshift.io "snippetapp" created
    deploymentconfig.apps.openshift.io "snippetapp" created
    service "snippetapp" created
--> Success
    Build scheduled, use 'oc logs -f bc/snippetapp' to track its progress.
    Application is not exposed. You can expose services to the outside world by executing one or more of the commands below:
     'oc expose svc/snippetapp'
    Run 'oc status' to view your app.
```

Run Expose command

```bash
oc expose service/snippetapp


route.route.openshift.io/snippetapp exposed
```

Check for Route and check if Route is working


```bash
oc get route
```

Check Route in Browser

=> failed atm


## Heroku

In Repository Directory: 

```bash
npm link pg express body-parser
``` 

Heroku Account login:
```bash
heroku login -i
```

Create an App on Heroku
```bash
heroku apps:create --addons=heroku-postgresql:hobby-dev
```
Check with List Command
```bash
heroku apps
 ›   Warning: heroku update available from 7.42.10 to 7.47.7.
=== walzl.martin@gmail.com Apps
peaceful-spire-97866
polar-ravine-93679

[root@localhost cloud]# heroku ps
 ›   Warning: heroku update available from 7.42.10 to 7.47.7.
Free dyno hours quota remaining this month: 550h 0m (100%)
Free dyno usage for this app: 0h 0m (0%)
For more information on dyno sleeping and how to upgrade, see:
https://devcenter.heroku.com/articles/dyno-sleeping

No dynos on ⬢ peaceful-spire-97866
```

Init Database:

```bash
heroku pg:psql <db_init.sql
```
Check  DB Content: 

```bash
heroku pg:psql <<HERE
select * from snippets;
HERE

 ›   Warning: heroku update available from 7.42.10 to 7.47.7.
--> Connecting to postgresql-curly-07530
    id    |    name     |     description      | author | language |              code              |          tags
----------+-------------+----------------------+--------+----------+--------------------------------+-------------------------
 12346789 | Hello World | print a String Value | john   | Java     | System.println("Hello World"); | {simple,beginner,print}
(1 row)
```

Set environment variables
```bash
export DATABASE_URL=$(heroku config:get DATABASE_URL)
export SSL=true
```

Test App 

```bash
heroku local
curl http://127.0.0.1:5000/snippets/1 
```

Publish App

```bash
git push heroku master
```

Open Heroku in Browser

```bash
heroku open
```
**Heroku Adres**

https://peaceful-spire-97866.herokuapp.com/