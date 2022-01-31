# Tmdb-react-native-node
This is a sample node backend and react native frontend which uses Tmdb APIs

## Node backend Setup

Once you clone or download project go into you folder

> now copy **.env.dist** file to **.env** file

### Installing

```
yarn (this will install all dependent libraries)
```

### Database Config Setup

Create new database called **tmdb-db**.
Then in your **.env** file will set below parameters.

```
DB_HOST=localhost                                # database host
DB_USER=YOUR_MYSQL_INSTANCE_USENAME              # database username
DB_PASS=YOUR_MYSQL_INSTANCE_PASSWORD             # database password
DB_NAME=tmdb-db                                # database name
DB_DIALECT=mysql                                 # database dialect
DB_PORT=3306                                     # database port
```

### Migration run

After creating database and updating .env file run below commands

```
yarn migration
```

Migration will create tables and seed some default data.

Run `yarn start` to start the project

Run `yarn test` to run test



## React Native frontend app Setup

Once you clone or download project go into you folder
### Installing

```
yarn (this will install all dependent libraries)
```

Go to ios folder and run 
```
pod install
```
then come back to the root folder and run 

```
yarn ios
```

Run `yarn test` to run test