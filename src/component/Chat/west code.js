 {/* {cart.length > 0 ? (cart.slice().reverse()
                    .map((items) => (items.imageData) ? items.imageData.map((itm) => {

                            return <Card className='mb-3 responsive responsiveTablet' style={{ width: '35rem', borderRadius: '12px' }}>
                                <div className='profileName d-flex'>
                                    <div>
                                        <img className='profileImg mt-3 me-2 ms-3' src={items.profile} alt="" />
                                    </div>
                                    <div className='userName mt-3'>
                                        {items.firstname + " " + items.lastname}<span className='ms-1'>(He/Him)</span>
                                        <p>Full stack Developer <br /> {itm.time} <span><i class="fa-solid fa-earth-americas "></i></span></p>
                                    </div>
                                    <div className='ms-auto'>
                                        <Button onClick={() => deletePost(items._id, itm._id)} className='deleteBtn' variant='light'><i class="fa-solid fa-xmark fs-5"></i></Button>
                                    </div>
                                </div>
                                <div >
                                    {itm.caption !== "" && (
                                        <div className='m-2 m-2'>
                                            {itm.caption}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {itm.image ? (
                                        <img
                                            className='postImg'
                                            src={`data:image/jpeg;base64,${itm.image.split(',')[1]}`}
                                            alt='Post Image'
                                            key={itm.image}
                                        />
                                    ) : itm.video ? (
                                        itm.video.includes('youtube.com') || itm.video.includes('youtu.be') ? (
                                            <iframe
                                                className='postVideo'
                                                width='560'
                                                height='315'
                                                src={itm.video}
                                                title='YouTube Video'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                                key={itm.video}
                                            ></iframe>
                                        ) : (
                                            <video className='postVideo' controls key={itm.video}>
                                                <source src={itm.video} type='video/mp4' />
                                                Your browser does not support the video tag.
                                            </video>
                                        )
                                    ) : null}
                                </div>
                                <div className='comment'>
                                    <div className='d-flex justify-content-between p-2'>
                                        <div class="icon-container">
                                            <i class="fas fa-thumbs-up text-primary "></i>
                                            <i class="far fa-laugh text-success"></i>
                                            <i class="fas fa-heart text-danger"></i>
                                        </div>
                                        <div>
                                            {itm.comment.length}   commnets <span>.repost</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center ' >
                                        <ButtonGroup className='btnGrouplike' aria-label="Basic example">
                                            <Button className='btnlLike' variant="light" onClick={() => Liked(itm._id)}  >
                                                {likeBtn[itm._id] ? <i class="fa-solid fa-thumbs-up fs-4"></i> : <i class="fa-regular fa-thumbs-up fs-4"></i>}
                                                <span className='m-2 btnicons'>Like</span> </Button>
                                            <Button className='btnlCmtRe' variant="light" onClick={() => CommentVisibility(itm._id)}><i class="fa-regular fa-comment fs-4"></i><span className='m-2'>Comment</span> </Button>
                                            <Button className='btnlCmtRe' variant="light" onClick={() => handleRepost(items, itm)}><i class="fa-solid fa-arrows-spin fs-4"></i><span className='m-2'>Repost</span> </Button>
                                            <Button className='btnlSend' variant="light"><i class="fa-solid fa-paper-plane fs-4"></i><span className='m-2'>Send</span> </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div>
                                    {isCommentVisible[itm._id] && (
                                        <form >
                                            <div className='d-flex  m-2'>
                                                <div >
                                                    <img className='CommnetImg' src={items.profile} alt="" />
                                                </div>
                                                <div className='ComnentIn'>
                                                    <input className='ComnentInput' onChange={postComment} placeholder='Add a comment...' type="text" value={text} />
                                                    {post ? <Button onClick={() => Uploadcomment(itm._id, items._id)} className='postCommnetBtn m-2'>Post</Button> : ''}
                                                </div>
                                                <div className='d-flex justify-content-center comIcon '>
                                                    <div className='me-3'>
                                                        <i class="fa-regular fa-face-smile fs-5"></i>
                                                    </div>
                                                    <div className='ms-2'>
                                                        <i class="fa-regular fa-image fs-5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className='fs-6 ms-3 '>Most Relevent<i class="fa-sharp fa-solid fa-caret-down ms-1"></i></span>
                                            <div>
                                                {itm.comment.slice(0, showAllComments ? itm.comment.length : MinimumComments)
                                                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                                    .map((comment, index) => (
                                                        <div key={index}>
                                                            <div className='d-flex ms-2  '>
                                                                <div className='mt-3 ms-2'>
                                                                    <img className='commentProfile' src={comment.profile} alt="" />
                                                                </div>
                                                                <div className='ms-2 commentName'>
                                                                    {comment.name}
                                                                    <div className='time d-flex'>
                                                                        <div>
                                                                            {formatTime(comment.updatedAt)}

                                                                            {fullName === comment.name && <button style={{ background: 'none', border: 'none', }} onClick={() => deletePost(comment._id, items._id)}><i class="fa-solid fa-trash-can"></i></button>}

                                                                        </div>

                                                                    </div>

                                                                    <p style={{ fontSize: 'small' }}>FrontEnd Developer(React/Redux/Javascript)</p>
                                                                    <span className='msg'>{comment.comment}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                {!showAllComments && itm.comment.length > MinimumComments && (
                                                    <div className='see-more-comments'>
                                                        <button className='btn btn-varint' onClick={() => setShowAllComments(true)}>Load more comment</button>
                                                    </div>
                                                )}

                                            </div>
                                        </form>
                                    )}
                                </div>
                            </Card>
                        }) : null)
                ) : (
                    [1, 2, 3].map((items) => <Skeletons key={items} />)
                )} */}

                  {/* {cart.length > 0 ? (
                    cart.slice().reverse().map((items) => {
                        const combinedData = [...items.rePost, ...items.imageData];
                        return combinedData.map((item) => (
                            <React.Fragment key={item._id}>
                                {item.imageData && (
                                    <Card className='mb-3 responsive responsiveTablet' style={{ width: '35rem', borderRadius: '12px' }}>
                                        <div className='profileName d-flex'>
                                            <div>
                                                <img className='profileImg mt-3 me-2 ms-3' src={items.profile} alt="" />
                                            </div>
                                            <div className='userName mt-3'>
                                                {items.firstname + " " + items.lastname}<span className='ms-1'>(He/Him)</span>
                                                <p>Full stack Developer <br /> {item.time} <span><i className="fa-solid fa-earth-americas "></i></span></p>
                                            </div>
                                            <div className='ms-auto'>
                                                <Button onClick={() => deletePost(items._id, item._id)} className='deleteBtn' variant='light'><i className="fa-solid fa-xmark fs-5"></i></Button>
                                            </div>
                                        </div>
                                        <div >
                                            {item.caption !== "" && (
                                                <div className='m-2 m-2'>
                                                    {item.caption}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            Render image or video
                                        </div>
                                        <div className='comment'>
                                            Render comments and buttons
                                        </div>
                                    </Card>
                                )}

                                Render repostData card
                                {item.rePost && (
                                    <Card className='mb-3 responsive responsiveTablet' style={{ width: '35rem', borderRadius: '12px' }}>
                                     
                                    </Card>
                                )}
                            </React.Fragment>
                        ));
                    })
                ) : (
                    [1, 2, 3].map((items) => <Skeletons key={items} />)
                )} */}


                //image/Video

                 {/* <div>
                                            {itm.caption && itm.caption !== "" && (
                                                <div className='m-2'>
                                                    {itm.caption}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {itm.image && itm.image !== "" ? (
                                                <img
                                                    className='postImg'
                                                    src={itm.image}
                                                    alt='Post Image'
                                                    key={itm.image}
                                                // style={{ width: '100%', height: 'auto' }} // Adjust style as needed
                                                />
                                            ) : itm.video && itm.video !== "" ? (
                                                itm.video.includes('youtube.com') || itm.video.includes('youtu.be') ? (
                                                    <iframe
                                                        className='postVideo'
                                                        width='560'
                                                        height='315'
                                                        src={itm.video}
                                                        title='YouTube Video'
                                                        frameBorder='0'
                                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                        allowFullScreen
                                                        key={itm.video}
                                                    ></iframe>
                                                ) : (
                                                    <video className='postVideo' controls key={itm.video}>
                                                        <source src={itm.video} type='video/mp4' />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )
                                            ) : (
                                                <div>No media available</div>
                                            )}
                                        </div> */}


                                         {/* <div>
                                            {itm.caption !== "" && (
                                                <div className='m-2 m-2'>
                                                    {itm.caption}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {itm.image ? (
                                                <img
                                                    className='postImg'
                                                    src={itm.image}
                                                    alt='Post Image'
                                                    key={itm.image}
                                                    // style={{ width: '100%', height: 'auto' }} // Adjust style as needed
                                                />
                                            ) : itm.video ? (
                                                itm.video.includes('youtube.com') || itm.video.includes('youtu.be') ? (
                                                    <iframe
                                                        className='postVideo'
                                                        width='560'
                                                        height='315'
                                                        src={itm.video}
                                                        title='YouTube Video'
                                                        frameBorder='0'
                                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                        allowFullScreen
                                                        key={itm.video}
                                                    ></iframe>
                                                ) : (
                                                    <video className='postVideo' controls key={itm.video}>
                                                        <source src={itm.video} type='video/mp4' />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )
                                            ) : (
                                                <div>No media available</div>
                                            )}
                                        </div> */}

                                        
{/* <div>
                                            {itm.image ? (
                                                <img
                                                    className='postImg'
                                                    src={`data:image/jpeg;base64,${itm.image.split(',')[1]}`}
                                                    alt='Post Image'
                                                    key={itm.image}
                                                />
                                            ) : itm.video ? (
                                                itm.video.includes('youtube.com') || itm.video.includes('youtu.be') ? (
                                                    <iframe
                                                        className='postVideo'
                                                        width='560'
                                                        height='315'
                                                        src={itm.video}
                                                        title='YouTube Video'
                                                        frameBorder='0'
                                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                        allowFullScreen
                                                        key={itm.video}
                                                    ></iframe>
                                                ) : (
                                                    <video className='postVideo' controls key={itm.video}>
                                                        <source src={itm.video} type='video/mp4' />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )
                                            ) : null}
                                        </div> */}


                                        //comment details 

                                         {/* <div>
                                                        {itm.comment.slice(0, showAllComments ? itm.comment.length : MinimumComments)
                                                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                                                            .map((comment, index) => (
                                                                <div key={index}>
                                                                    <div className='d-flex ms-2  '>
                                                                        <div className='mt-3 ms-2'>
                                                                            <img className='commentProfile' src={comment.profile} alt="" />
                                                                        </div>
                                                                        <div className='ms-2 commentName'>
                                                                            {comment.name}
                                                                            <div className='time d-flex'>
                                                                                <div>
                                                                                    {formatTime(comment.updatedAt)}

                                                                                    {fullName === comment.name && <button style={{ background: 'none', border: 'none', }} onClick={() => deletePost(comment._id, items._id)}><i class="fa-solid fa-trash-can"></i></button>}

                                                                                </div>

                                                                            </div>

                                                                            <p style={{ fontSize: 'small' }}>FrontEnd Developer(React/Redux/Javascript)</p>
                                                                            <span className='msg'>{comment.comment}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        {!showAllComments && itm.comment.length > MinimumComments && (
                                                            <div className='see-more-comments'>
                                                                <button className='btn btn-varint' onClick={() => setShowAllComments(true)}>Load more comment</button>
                                                            </div>
                                                        )}

                                                    </div> */}


                                                    //rePost code

                                                     {/* <div className='profileNamePost d-flex'>
                                            <div>
                                                <img className='profileImgPost mt-1 me-2 ms-3' src={items.profile} alt="" />
                                            </div>
                                            <div className='userName mt-2' style={{ fontSize: '12px' }}>
                                                {items.firstname + " " + items.lastname}<span className='ms-1' style={{ fontSize: '12px' }}>Reposted this</span>
                                            </div>
                                            <div className='ms-auto'>
                                                <Button onClick={() => deletePost(rePostItem._id, rePostItem._id)} className='deleteBtnPost' variant='light'><i class="fa-solid fa-ellipsis fs-5"></i></Button>
                                            </div>
                                        </div>
                                        <Divider className=' dividerLine' />
                                        <div>
                                            {rePostItem.caption !== "" && (
                                                <div className='m-1'>
                                                    {rePostItem.caption}
                                                </div>
                                            )}
                                        </div> */}

                                        //Reply Comment 
                                         {/* {reply && replyTo === comment.name && (
              <div style={{ display: 'flex', marginLeft: '100px' }}>
                <div>
                  <img className='CommnetImg' src={profileImg} alt="" />
                </div>
                <div className='ComnentIn'>
                  <input
                    className='ReplyInput'
                    onChange={handleCommentChange}
                    placeholder={`Reply to ${comment.name}...`}
                    type="text"
                    value={text}
                  />
                  <button onClick={() => Uploadcomment()} className='replyCommnetBtn m-2'>Reply</button>
                </div>
              </div>
            )} */}