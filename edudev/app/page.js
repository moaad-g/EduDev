'use client'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Card , CardMedia , CardContent , Typography , Button  , Pagination , Container, CardActionArea } from '@mui/material';
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
        <div className='grid grid-cols-2 items-center h-screen'>
          <div className='mx-auto'> 1 </div>
          <div className='mx-auto'>
            <Card className='w-1/2'>
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
            <Pagination count={5} size="large" onChange={(e, page) => setCurrentArticle(page - 1)} />
          </div>
        </div> 
      </Container> 
    );
  }
}
