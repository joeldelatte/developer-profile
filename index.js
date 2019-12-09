const axios = require("axios");
const util = require("util");
const fs = require("fs");
const inquirer = require("inquirer");
const PDF = require("pdfkit");

getGit();

async function getGit() {
    try{
        const { username, color } = await inquirer.prompt([{
            message: "What's your github username?",
            name: "username"
            },
            {    
            message: "What's your favorite color?",
            name: "color"
           }
        ]);
        
        
        const queryUrl = `https://api.github.com/users/${username}`;
        const { data } = await axios.get(queryUrl)
        
        const name = data.name
        const image = data.id
        const bio = data.bio
        const followers = data.followers
        const following = data.following
        const pubRepos = data.public_repos
        const profileUrl = data.url
        const blog = data.blog
        const location = data.location
        // const userData = [bio, followers, following, pubRepos, profileUrl, location, userData];//? do I need this

        let doc = new PDF();

        doc.pipe(fs.createWriteStream(`pdf-files/${username}-profile.pdf`));
        // doc.image(`https://avatars1.githubusercontent.com/u/${image}?v=4`, 320, 280, {scale: 0.25});
        doc.text(`Developer Profile: ${name} \n
            github signin: ${username} \n
            Locale: ${location} \n
            Favorite color: ${color} \n
            Bio: ${bio} \n
            Followers: ${followers} \n
            Following: ${following} \n
            Public Git Repositories: ${pubRepos} \n
            Links: \n
            ${profileUrl} \n
            https://www.google.com/maps/place/${location} \n
            ${blog}`, 100, 100
        );
        doc.end();

        

        // const locationUrl = `https://www.google.com/maps/place/${location}`
        // console.log(username, "\n", color, "\n", bio, "\n", followers, "\n",
        //  following, "\n", pubRepos, "\n", profileUrl, "\n", location);
       

    } catch (err) {
        console.log(err);
    }
};