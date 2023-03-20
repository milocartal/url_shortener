export default function Link() {
  return <p>you will be redirected soon.</p>;
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  console.log(id);

  const response = await fetch('http://localhost:3000/api/recup', {
      method: 'POST',
      body: JSON.stringify({ id : String(id) }),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    
    const data = await response.json();
    console.log(data);


  const info = data;

  if (!info) {
    return {
      notFound: true,
    };
  } else {
    return {
      redirect: {
        destination: info.value,
        permanent: true,
      },
    };
  }
}