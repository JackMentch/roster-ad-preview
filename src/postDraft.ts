const postDraft = (name:string, score:string, draft_id: string) => {

    const blocked = ['joebiden','realdonaldtrump','salvulcano','jamessmurray','bqquinn','elonmusk','twaimz', 'livvydunne', 'jamescharles', 'miketrout', 'brazzers'];

    const lowerName = name.toLowerCase();

    if (blocked.includes(lowerName)){
        console.log('blocked')
        return 0
    }

    const url = `https://imac-draft-api.vercel.app/api/postDraft?name=${name}&score=${score}&draft_id=${draft_id}`;

 
    const fetchData = async () => {
      try {
      
        const response = await fetch(url);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData()
  
    return 0;
  };

  export default postDraft;