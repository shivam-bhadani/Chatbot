## Website Link : https://shivamchatbotwebsite.herokuapp.com/

1. To run this website open command prompt and go to the root folder then in command prompt type ->   node app.js<br />
&emsp;&emsp;Then go to localhost:2000 in your browser.

2. To access admin pannel go to localhost:2000/admin then enter username and password.
If you already logged in then if you go to /admin then you will be automatically redirected to /admin/add-questions route

3. To add admin add the below code in adminRoute.js inside routes folder

    ```javascript
    router.post('/register', async (req, res) => {
        try {

            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                password: hashPassword
            });
            console.log(user)
            await user.save();
            res.redirect('/admin/add-question')
        } catch (error) {
            console.log(error);
            res.redirect('/');
        }
    })
    ```

Then open admin.ejs inside views folder. Change the form action "/admin/login" to "/admin/register" 
Next go to /admin route in chrome browser type username and password then hit login button you will redirected to home page.
Now go to database and inside user collection change the newly added admin role from user to admin.
Then your new admin will be created.
Now remove the above code from adminRoute.js and change back form action of admin.ejs to "/admin/login"

If you want to host this website then add your mongodb atlas or any database url inside .env file add MONGODB_URL = databaseUrl
