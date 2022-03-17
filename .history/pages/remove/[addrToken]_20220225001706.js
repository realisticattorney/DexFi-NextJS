const Remove = ({address, token}) => {
   console.log('address', address);
   cons
  return (
    <div>
      <h1>Remove</h1>
    </div>
  );
};

export default Remove;

export async function getServerSideProps(context) {
   const { addrToken } = context.query;
   const [address, token] = addrToken.split('_');

   return {
       props: {
             address,
             token
         }
   }
}
