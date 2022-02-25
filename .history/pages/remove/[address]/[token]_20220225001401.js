const Remove = ({token}) => {
   console.log('token', token);
  return (
    <div>
      <h1>Remove</h1>
    </div>
  );
};

export default Remove;

export async function getServerSideProps(context) {
   const { token } = context;
   return {
       props: {
         token
         }
   }
}
