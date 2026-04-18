import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import MainLayout from '../components/MainLayout'
import PageHeader from '../components/PageHeader'
import { FocusCards } from '../components/ui/FocusCards'
import { fetchCourseList } from '../api/course'

/**
 * 课程列表页面
 * 使用 FocusCards 瀑布流展示所有在线微课程
 */
function CourseListPage() {
  // 1. hooks & state
  const [courseList, setCourseList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // 2. effects
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const responseData = await fetchCourseList()
        setCourseList(responseData)
      } catch (error) {
        console.error('获取课程列表失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // 3. derived data
  const cardDataList = courseList.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    src: item.coverImage || 'https://via.placeholder.com/400x600?text=课程封面',
    tag: item.chapters?.some((ch) => ch.source === 'bilibili') ? 'Bilibili' : undefined,
    onClick: () => navigate(`/courses/${item._id}`)
  }))

  // 4. JSX return
  return (
    <MainLayout>
      <PageHeader title="在线微课程" subtitle="根雕技艺 · 纪录片与教程" />
      <div style={{ padding: '0 24px 64px', maxWidth: 1280, margin: '0 auto' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <Spin size="large" />
          </div>
        ) : (
          <FocusCards cards={cardDataList} />
        )}
      </div>
    </MainLayout>
  )
}

export default CourseListPage
