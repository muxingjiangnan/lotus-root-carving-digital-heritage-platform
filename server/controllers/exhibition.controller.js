const Exhibition = require('../models/Exhibition')

const defaultHistoryContent = `莲花根雕是长沙市岳麓区莲花镇特色传统手工艺，2012 年被列入岳麓区区级非物质文化遗产。
莲花镇依山傍水、植被丰茂，树根资源得天独厚，当地匠人长期以天然树根为材料，依形就势、精雕细琢，
逐渐形成兼具自然意趣与人文内涵的根雕艺术风格。莲花根雕不刻意破坏根材天然形态，讲究“天人合一”，
作品多以人物、动物、山水、花鸟为题材，刀法细腻、意境悠远，承载湖湘乡土文化与民间审美，
是湖南地方非遗中极具代表性的手工技艺之一。随着现代化发展，传统根雕面临技艺学习难、传承人老龄化、
传播渠道窄、经济效益低等困境，项目以数字化方式对其进行记录、展示与传承，让古老技艺重新走进大众视野。`

const defaultCoursesContent = `<p>项目围绕莲花根雕打造系统化非遗数字课程，面向中小学生、大学生及文化爱好者，降低学习门槛、提升传播效率。</p>
<p><strong>课程体系：</strong></p>
<p>《自然之不朽 —— 朽木不朽》以根材自然美学为核心，讲解莲花根雕自然观、艺术理念与文化价值。</p>
<p>《生活的艺术》内容包括：制作工具介绍、完整工艺流程教学、根雕历史文化、艺术鉴赏方法、基础创作思路。</p>
<p>“我是非遗传承人”影像记录课以纪实形式呈现匠人故事、创作过程、技艺要点，增强文化感染力。</p>
<p><strong>课程特点：</strong>系统完整、通俗易懂、重点突出、适合校园普及与社会传播。</p>`

const defaultProjectContent = `<p>莲韵非遗 · 数字传承是湖南财政经济学院大学生创新创业训练计划项目，聚焦湖南莲花根雕非遗保护与数字化传承，
通过数字化记录、资源库建设、课程开发、文化推广等方式，解决传统非遗技艺难掌握、经济效益低、受众面窄三大痛点。</p>
<p>项目以数字化赋能非遗为核心，搭建根雕文化展示平台，系统整理莲花根雕历史、技艺、作品、流程等资源，
面向学校、博物馆、文化机构提供数字化内容服务，推动非遗进校园、进课堂、进生活。
同时联动地方文旅与匠人，助力乡村文化振兴，增强青年文化自信，让湖湘非遗在数字时代实现可持续传承与创新发展。</p>`

/**
 * 为展厅数据填充默认内容
 * 当数据库中对应字段为空或未设置时，使用预设文案作为默认值
 */
const _fillDefaultContent = (exhibition) => {
  const obj = exhibition.toObject ? exhibition.toObject() : exhibition
  return {
    ...obj,
    historyContent: obj.historyContent !== undefined && obj.historyContent !== ''
      ? obj.historyContent
      : defaultHistoryContent,
    coursesContent: obj.coursesContent !== undefined && obj.coursesContent !== ''
      ? obj.coursesContent
      : defaultCoursesContent,
    projectContent: obj.projectContent !== undefined && obj.projectContent !== ''
      ? obj.projectContent
      : defaultProjectContent
  }
}

/**
 * 获取展厅信息
 * 若展厅数据不存在，则自动创建一条包含默认内容的记录
 */
async function getExhibitionInfo(req, res, next) {
  try {
    let exhibition = await Exhibition.findOne()

    // 首次访问时自动初始化展厅数据
    if (!exhibition) {
      exhibition = await Exhibition.create({
        title: '莲花根雕非遗文化展厅',
        historyContent: defaultHistoryContent,
        coursesContent: defaultCoursesContent,
        projectContent: defaultProjectContent,
        sections: []
      })
    }

    res.json(_fillDefaultContent(exhibition))
  } catch (error) {
    next(error)
  }
}

/**
 * 更新展厅信息（管理员）
 */
async function editExhibition(req, res, next) {
  try {
    const { title, historyContent, coursesContent, projectContent, sections } = req.body
    let exhibition = await Exhibition.findOne()

    if (!exhibition) {
      // 若记录不存在则创建新记录
      exhibition = await Exhibition.create({
        title,
        historyContent,
        coursesContent,
        projectContent,
        sections
      })
    } else {
      // 逐字段更新，避免 undefined 覆盖已有数据
      if (title !== undefined) exhibition.title = title
      if (historyContent !== undefined) exhibition.historyContent = historyContent
      if (coursesContent !== undefined) exhibition.coursesContent = coursesContent
      if (projectContent !== undefined) exhibition.projectContent = projectContent
      if (sections !== undefined) exhibition.sections = sections
      exhibition.updatedAt = Date.now()
      await exhibition.save()
    }

    res.json(_fillDefaultContent(exhibition))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getExhibitionInfo,
  editExhibition
}
