import preact from 'preact'

import './About.css'

export default function About({ children }: { children: preact.ComponentChildren }) {
  return (
    <div className='About'>
      <div className='About__nav'>
        <a href='/counter'>Counter</a>
      </div>
      {children}
      <div className='About__content'>
        <h1>About</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ipsum lacus, commodo vitae orci a, ullamcorper ullamcorper dui. Sed accumsan dapibus sagittis. Morbi posuere ullamcorper neque ut eleifend. Nunc dictum lacus nec interdum tempor. Quisque semper ligula sed metus dapibus, vitae vestibulum urna lobortis. Etiam efficitur non mauris ac bibendum. Praesent lacinia lectus sed enim tristique mollis. Ut non nunc quis augue lobortis commodo. Pellentesque pretium risus nisi, ac congue dui dignissim et. Fusce mi tortor, iaculis a luctus eget, porttitor nec orci. Maecenas pretium tempus elementum.

Aliquam eleifend eros eget vulputate porta. Fusce nec nunc tincidunt, pellentesque leo nec, venenatis metus. Curabitur sit amet augue et risus viverra suscipit et ac enim. Maecenas elementum nec dui vitae fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec quis tortor scelerisque massa pulvinar tincidunt in a ante. Nulla semper sem vel quam tincidunt sodales. Nullam quis lacus id nibh efficitur finibus. Donec at rhoncus tellus, sed condimentum nibh. Etiam iaculis suscipit orci, id semper orci malesuada non. Vivamus vel aliquet justo. Vestibulum id nisi aliquet, sagittis massa et, vulputate elit.

Ut sed ultrices magna. Vivamus sagittis quam in porttitor congue. In efficitur nec ex eu vulputate. Sed quis ex sed odio laoreet pellentesque. Nam vehicula dui sed placerat tempor. Vivamus id rhoncus dolor, vel congue metus. Phasellus a diam quam. Ut sollicitudin facilisis pulvinar. Proin non hendrerit enim, eu ullamcorper sem.

Suspendisse dolor est, tincidunt non feugiat nec, sollicitudin non nunc. Proin quis risus diam. Curabitur sed tempor nisl. Pellentesque tempor lorem nibh, sit amet consectetur risus commodo eleifend. Integer congue nisi in arcu facilisis venenatis. Ut gravida est non justo scelerisque, nec mollis nibh elementum. Aenean non augue arcu. Curabitur at tincidunt sem. Proin vehicula, massa sed tincidunt iaculis, tellus leo malesuada sapien, sed porta est felis sit amet tellus. Suspendisse neque est, vulputate ac imperdiet et, ultrices maximus dui.

Proin scelerisque vestibulum ipsum, vitae venenatis arcu. Vivamus in accumsan libero. Vestibulum egestas velit non eros consequat egestas. Phasellus vel erat nec massa ultrices rutrum. Vivamus feugiat laoreet arcu sollicitudin viverra. Quisque posuere nisi sed sapien tincidunt pharetra. Aenean ut odio at nisi congue malesuada quis in purus.</p>
      </div>
    </div>
  )
}
