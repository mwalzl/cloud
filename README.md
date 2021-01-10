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
git clone https://git-iit.fh-joanneum.at/walzlmar17/cc.git
cd cc
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


