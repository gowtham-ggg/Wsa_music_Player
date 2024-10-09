Music Player Project

Project Folder Setup:
Go to the project folder.
Create a new folder: MusicPlayer.
Create another folder inside: Level 1.


Step 1: Understand the Project Goal
Sections:
Track List: Consists of all song lists.
Player Section: Displays the current song, its progress, and includes controls (Play, Pause, Stop, Volume).

Step 2: Planning
Basic Structure:

HTML Page Structure: DOCTYPE, html, head, body.
Main Container:

A div that will wrap the entire music player container.
Left Section (Track List):

Contains:
WSA logo.
Track list (song titles, artist names, durations).
Right Section (Player Controls):

Contains:
Thumbnail image.
Song title, artist names.
Progress bar, time display.
Control buttons (Play, Pause, Stop, Volume).
Slider for adjusting the volume.

Step 3: HTML Elements to Use
<title>: Defines the title of the webpage.

Main Wrapper (<div>):

<div class="music-player"> : This is the main wrapper for the music player container.
Track List Section:

Use the <section> tag for the track list.
Logo: <img> (Image tag for displaying the logo).
Heading: <h2> (Track List heading).
List of Songs: Use a <div> to contain the list of songs.
Player Section:

Use a <div> to wrap the player section.
Thumbnail: Display the thumbnail image.
Song Title & Description: Use a <p> tag for text (paragraph).
Progress Bar: <input type="range"> (for showing the progress of the song).
Control Buttons: <button> (Play, Pause, Stop, etc.).
Volume Control: Another <input type="range"> to control the volume.

Step 4: Coding Part 

1.create the html Structure
2. main wrapper : div class= music-player
3. Create track list section
(left section)

4.create right section
5. HTML structure is completed


js part 

1. page load [domcontentload]

2. Songs array

3.Create one Audio object using Audio(); Constructor(Built-in)
      let audio = new Audio();

> audio.src 
> audio.play(); - it will start playing loaded audio file.
> audio.pause(); - to pause audio (method)
> audio.paused - it this property (it is used to check audio is paused or not)

4. Accessing the Dom Elements

5. Adding the event Listener

6. Loading the current song

7.Play/pause function

8. Highlight The current song

9. Loading songs detail

10. Managing the track controls

11. updating the progress bar and volume

12. Rendering current song


