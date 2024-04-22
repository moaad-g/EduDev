'use client'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Card , CardMedia , CardContent , Typography , Button  , Pagination , Container, CardActionArea , Divider } from '@mui/material';
import { useRouter } from "next/navigation";


export default function Home() {
  const [articleList,setArticleList] = useState(null);
  const [currentArticle,setCurrentArticle] = useState(0);
  const router = useRouter();

  useEffect (() => {
    (async() =>{
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category: 'technology',
            apiKey: 'ae2ea50d2f254768bb96e4cfa6f6bf9f'
          }
        });
        if (response.data.articles.length > 0) {
          setArticleList(response.data.articles.slice(0,5));
        }
      } catch (error) {
        console.error('Error fetching tech news:', error);
      }
    })
    ();
  },[])

  useEffect (() => {
    console.log()
  },[currentArticle])

  if(articleList){
    const article = articleList[currentArticle];
    return (
      <Container>
        <div className='grid grid-cols-2 h-screen mt-10'>
          <div className=''> 1 </div>
          <div className=' flex-col justify-between'>
            <div className='mb-10'>
            <Typography level="h2" className="text-xl font-bold mb-3">NEWS</Typography>
                <Card elevation={10} className='w-full h-1/2'>
                  <CardActionArea onClick={()=>router.push(article.url)}>
                  <img className='h-40 w-full' src={article.urlToImage} />
                  <CardContent className='overflow-hidden'>
                    <Typography className="truncate" variant="h5">
                      {article.title}
                    </Typography>
                    <Typography className="" variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              <div className='flex justify-center mt-4'>
              <Pagination count={5} size="large" onChange={(e, page) => setCurrentArticle(page - 1)} />
              </div>
            </div>
            <div className='mt-10'>
              <Typography level="h1" className="text-xl font-bold mb-3">Topic Of the Week</Typography>
                <Typography className="truncate" variant="h5">
                    Continuous Integration
                </Typography>
            </div>
          </div>
        </div> 
      </Container> 
    );
  }
}
