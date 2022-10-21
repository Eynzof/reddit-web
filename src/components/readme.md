```Warning: Did not expect server HTML to contain a <a> in <div>.```


The issue occurs because you're using typeof window !== 'undefined' as a condition to render. This returns different things in the server and client, meaning there will be a mismatch when rehydration occurs on the client. I'd recommend you use next/router to check for the current path, rather than using window.location.pathname, avoiding using the typeof window !== 'undefined' check entirely. – 
juliomalves
 Jan 24 at 16:26 

Also, you should probably conditionally render the Layout rather than the signin and register pages themselves. You can use the per-page layout pattern to do that: nextjs.org/docs/basic-features/layouts#per-page-layouts. – 
juliomalves
 Jan 24 at 16:32

 [reactjs - Warning: Did not expect server HTML to contain a <div> in <div> - Stack Overflow](https://stackoverflow.com/questions/70829560/warning-did-not-expect-server-html-to-contain-a-div-in-div)