const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Store the event so it can be triggered later
let deferredPrompt;

// Add an event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();

  // Save the event for later use
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Log the user's choice
    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferredPrompt variable since it can only be used once
    deferredPrompt = null;

    // Hide the install button after the prompt is handled
    butInstall.style.display = 'none';
  }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully!', event);
});