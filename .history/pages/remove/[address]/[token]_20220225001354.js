const Remove = ({addrToken}) => {
   console.log('addrToken', addrToken);
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
             addrToken
         }
   }
}
