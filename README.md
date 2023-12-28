# Authentication
- User login and signup
- Used local mongodb server for database
- In next part I will do authorization

# Imp Note
- Export models like below syntax
```
const UserModel = mongoose.models.user || mongoose.model('user', userSchema);
export default UserModel;
````



## How to run

- Downlaod the code or make a clone of the repo by pasting the below command
- Make sure you are dowloading the code from the correct branch

```gh repo clone creotove/learning-next-14```

- Go the foldet where code is downloaded run the below commands
```bash
npm i
```
```bash
npm run dev
```
- Day 3 of next js 29-12-2023
- Hope I will be consistent