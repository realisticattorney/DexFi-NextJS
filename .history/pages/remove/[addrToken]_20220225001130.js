const Remove = ({addrToken}) => {
   
  return (
    <div>
      <h1>Remove</h1>
    </div>
  );
};

export default Remove;

export async function getServerSideProps(context) {
   const { addrToken } = context.query;
   return {
       props: {
             addrToken
         }
   }
}
